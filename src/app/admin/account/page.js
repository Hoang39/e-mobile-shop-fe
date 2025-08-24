"use client";

import AdminTab from "@/components/admin/adminTab";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getAllProfile, updateRole, getProfile } from "@/app/api/userApi";
import Modal from "@mui/material/Modal";
import { useRouter } from "next/navigation";
import Error from "@/components/error/error";

export default function AdminAccount() {
  const [products, setProducts] = useState([]);
  const [productAll, setProductAll] = useState([]);
  const [productLength, setProductLength] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedValue, setSelectedValue] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [res, setRes] = useState(null);
  const [user, setUser] = useState(null);

  const options = [
    { value: "admin", label: "Quản lý" },
    { value: "customer", label: "Khách hàng" }
  ];

  const [token, setToken] = useState(null);

  useEffect(() => {
    (async () => {
      const token_ = localStorage.getItem("user-token");
      setToken(token_);
      const listProducts = await getAllProfile(token_);
      setProductAll(listProducts);
      setProducts(listProducts.slice(0, 10));
      setProductLength(listProducts?.length);
      setUser(await getProfile(token_))
    })();
  }, []);

  useEffect(() => {
    setProducts(productAll?.slice((currentPage - 1) * 10, currentPage * 10));
  }, [currentPage]);

  const router = useRouter();

  return token ? (
    <div className="flex flex-row">
      <AdminTab />

      <div className="bg-primary_color/10 h-screen w-[85%] px-20 pt-10">
        <div className="bg-white drop-shadow-lg rounded p-8">
          <div className="flex items-center gap-x-4">
            <p className="font-bold font-primary text-primary_color text-xl py-4 border-b-2 px-4">
              Tài khoản
            </p>
            <div onClick={() => setOpenModalAdd(true)} className="px-4 py-2 text-white bg-blue-500 rounded-xl text-sm cursor-pointer">Thêm tài khoản</div>
          </div>
          <div className="grid grid-cols-4 text-sm border-b-2 py-2">
            <p className="px-4 font-semibold text-black py-3">ID</p>
            <p className="px-4 font-semibold text-primary_color py-3">Name</p>
            <p className="px-4 font-semibold text-gray-800 py-3">Email</p>
            <p className="px-4 font-semibold text-primary_color py-3">Phone</p>
          </div>
          <div className="h-[360px] overflow-y-auto">
            {products?.map((item) => (
              <div
                key={item._id}
                className="grid grid-cols-4 text-sm border-b-2 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  if (user?._id !== item?._id) {
                    setRes(item);
                    setOpenModal(true);
                  }
                }}
              >
                <p className="px-4 font-semibold py-3 text-black">{item._id}</p>

                <p className="px-4 text-primary_color py-3 line-clamp-2">
                  {item.name}
                </p>
                <p className="px-4 text-gray-800 py-3">{item.email}</p>
                <p className="px-4 text-primary_color py-3 line-clamp-2">
                  {item.phoneNumber}
                </p>
              </div>
            ))}
          </div>
          <div className="flex gap-x-3 items-center text-sm">
            <p
              onClick={() => {
                if (currentPage > 1) setCurrentPage(currentPage - 1);
              }}
              className="text-sub_primary_color border-2 rounded-lg py-1 px-2 cursor-pointer hover:text-primary_color hover:bg-gray-100"
            >
              {"<"}
            </p>
            <p className="text-primary_color">{currentPage}</p>
            <p
              onClick={() => {
                if (currentPage < Math.ceil(productLength / 10))
                  setCurrentPage(currentPage + 1);
              }}
              className="text-sub_primary_color border-2 rounded-lg py-1 px-2 cursor-pointer hover:text-primary_color hover:bg-gray-100"
            >
              {">"}
            </p>
          </div>
        </div>
      </div>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(!openModal)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-1/2 bg-white drop-shadow-lg p-8">
          <div className="flex flex-col mb-4 text-primary_color">
            <div className="flex gap-x-2 items-center my-8">
              <p className="text-gray-800 text-sm">Cập nhật quyền: </p>
              <div>
                <select
                  // value={selectedValue}
                  onChange={(e) => setSelectedValue(e.target.value)}
                  className="text-sm text-primary_color border px-2 py-1"
                >
                  {options.map((option) => (
                    <option key={option.value} value={option.value} selected={res?.paymentStatus === option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <button
              className="block bg-teal-400 hover:bg-teal-600 text-white uppercase text-lg mx-auto p-2 rounded"
              type="submit"
              onClick={async () => {
                const token = localStorage.getItem("user-token");
                await updateRole(token, selectedValue, res?._id);
                setOpenModal(!openModal);
                router.push("/admin");
              }}
            >
              Update
            </button>
          </div>
          <div
            className="uppercase text-md font-semibold text-sub_primary_color text-center p-4 rounded hover:text-blue-500 cursor-pointer"
            onClick={() => setOpenModal(!openModal)}
          >
            Back
          </div>
        </div>
      </Modal>

      <Modal
        open={openModalAdd}
        onClose={() => setOpenModalAdd(!openModalAdd)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-1/2 bg-white drop-shadow-lg p-8">
          <div className="flex flex-col mb-4 text-primary_color">
              <p>Đăng ký tài khoản</p>
            <div className="flex gap-x-2 items-center my-8">
            <form className="w-full">
              <div className="relative z-0 w-full mb-3 group">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block py-2.5 px-0 w-full text-xs text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-black dark:border-gray-400 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Tên đăng nhập
                </label>
              </div>
              <div className="relative z-0 w-full mb-3 group">
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="block py-2.5 px-0 w-full text-xs text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-black dark:border-gray-400 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="password"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Mật khẩu
                </label>
              </div>
              <div className="relative z-0 w-full mb-3 group">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="block py-2.5 px-0 w-full text-xs text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-black dark:border-gray-400 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Tên người dùng
                </label>
              </div>
              <div className="relative z-0 w-full mb-3 group">
                <input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  className="block py-2.5 px-0 w-full text-xs text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-black dark:border-gray-400 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="phoneNumber"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Số điện thoại
                </label>
              </div>
              <div className="relative z-0 w-full mb-8 group">
                <input
                  type="text"
                  name="gender"
                  id="gender"
                  className="block py-2.5 px-0 w-full text-xs text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-black dark:border-gray-400 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="gender"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Giới tính
                </label>
              </div>
            </form>
            </div>
          </div>

          <div>
            <button
              className="block bg-teal-400 hover:bg-teal-600 text-white uppercase text-lg mx-auto p-2 rounded"
              type="submit"
            >
              Update
            </button>
          </div>
          <div
            className="uppercase text-md font-semibold text-sub_primary_color text-center p-4 rounded hover:text-blue-500 cursor-pointer"
            onClick={() => setOpenModalAdd(!openModalAdd)}
          >
            Back
          </div>
        </div>
      </Modal>
    </div>
  ) : (
    <Error />
  );
}
