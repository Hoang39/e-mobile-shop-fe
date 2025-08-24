import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

import { getAllCates } from "@/app/api/productApi";

import logo from "../../../src/image/logo/logo.png";
import { getProfile } from "@/app/api/userApi";
import { getAllProducts } from "@/app/api/productApi";
import { useRouter } from "next/navigation";

const headerItem = [
  {
    name: "Điện thoại",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
        <line x1="12" y1="18" x2="12.01" y2="18"></line>
      </svg>
    ),
    link: "phone",
  },
  {
    name: "Laptop",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        width="24"
        viewBox="0 0 640 512"
        fill="#fff"
      >
        <path d="M128 32C92.7 32 64 60.7 64 96V352h64V96H512V352h64V96c0-35.3-28.7-64-64-64H128zM19.2 384C8.6 384 0 392.6 0 403.2C0 445.6 34.4 480 76.8 480H563.2c42.4 0 76.8-34.4 76.8-76.8c0-10.6-8.6-19.2-19.2-19.2H19.2z" />
      </svg>
    ),
    link: "laptop",
  },
  {
    name: "Tablet",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        width="24"
        viewBox="0 0 448 512"
        fill="#fff"
      >
        <path d="M0 64C0 28.7 28.7 0 64 0H384c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zM256 448a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM384 64H64V384H384V64z" />
      </svg>
    ),
    link: "tablet",
  },
  {
    name: "Màn hình",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="8" y1="21" x2="16" y2="21"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
      </svg>
    ),
    link: "monitor",
  },
  {
    name: "Tivi",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
        <polyline points="17 2 12 7 7 2"></polyline>
      </svg>
    ),
    link: "tivi",
  },
  {
    name: "Đồng hồ",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="7"></circle>
        <polyline points="12 9 12 12 13.5 13.5"></polyline>
        <path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83"></path>
      </svg>
    ),
    link: "watch",
  },
  {
    name: "Âm thanh",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
      </svg>
    ),
    link: "speakerHeadphone",
  },
  {
    name: "Phụ kiện",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
        <rect x="9" y="9" width="6" height="6"></rect>
        <line x1="9" y1="1" x2="9" y2="4"></line>
        <line x1="15" y1="1" x2="15" y2="4"></line>
        <line x1="9" y1="20" x2="9" y2="23"></line>
        <line x1="15" y1="20" x2="15" y2="23"></line>
        <line x1="20" y1="9" x2="23" y2="9"></line>
        <line x1="20" y1="14" x2="23" y2="14"></line>
        <line x1="1" y1="9" x2="4" y2="9"></line>
        <line x1="1" y1="14" x2="4" y2="14"></line>
      </svg>
    ),
    link: "accessory",
  },
  {
    name: "Đồ cũ",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        width="24"
        viewBox="0 0 512 512"
        fill="#fff"
      >
        <path d="M64 80c-8.8 0-16 7.2-16 16V258c5.1-1.3 10.5-2 16-2H448c5.5 0 10.9 .7 16 2V96c0-8.8-7.2-16-16-16H64zM48 320v96c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V320c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zM0 320V96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V320v96c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320zm280 48a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm120-24a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
      </svg>
    ),
    link: "oldProduct",
  },
  {
    name: "Dịch vụ",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        width="24"
        viewBox="0 0 512 512"
        fill="#fff"
      >
        <path d="M78.6 5C69.1-2.4 55.6-1.5 47 7L7 47c-8.5 8.5-9.4 22-2.1 31.6l80 104c4.5 5.9 11.6 9.4 19 9.4h54.1l109 109c-14.7 29-10 65.4 14.3 89.6l112 112c12.5 12.5 32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3l-112-112c-24.2-24.2-60.6-29-89.6-14.3l-109-109V104c0-7.5-3.5-14.5-9.4-19L78.6 5zM19.9 396.1C7.2 408.8 0 426.1 0 444.1C0 481.6 30.4 512 67.9 512c18 0 35.3-7.2 48-19.9L233.7 374.3c-7.8-20.9-9-43.6-3.6-65.1l-61.7-61.7L19.9 396.1zM512 144c0-10.5-1.1-20.7-3.2-30.5c-2.4-11.2-16.1-14.1-24.2-6l-63.9 63.9c-3 3-7.1 4.7-11.3 4.7H352c-8.8 0-16-7.2-16-16V102.6c0-4.2 1.7-8.3 4.7-11.3l63.9-63.9c8.1-8.1 5.2-21.8-6-24.2C388.7 1.1 378.5 0 368 0C288.5 0 224 64.5 224 144l0 .8 85.3 85.3c36-9.1 75.8 .5 104 28.7L429 274.5c49-23 83-72.8 83-130.5zM56 432a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z" />
      </svg>
    ),
    link: "service",
  },
];

const viewCate = (cateArr, path) => {
  const cateTitle = cateArr.filter((item) => !item.parent);
  return (
    <div className="flex px-4 space-x-8">
      {cateTitle.map((item, index) => (
        <div className="" key={index}>
          <Link className="text-sub_primary_color" href={`/cate/${item.slug}`}>
            <p className="text-black font-semibold text-sm hover:text-sub_primary_color">
              {item.name.toUpperCase()}
            </p>
          </Link>
          <div className="my-4">
            {cateArr
              .filter(
                (item2) => item2.parent && item2.parent.slug === item.slug
              )
              .map((e, index) => (
                <Link
                  href={`/cate/${e.slug}`}
                  className="text-sub_primary_color"
                  key={index}
                >
                  <p className="text-primary_color text-xs py-1 hover:underline">
                    {e.name}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const Header = () => {
  const [cateList, setCateList] = useState({});

  const [userInfo, setUserInfo] = useState(null);
  const [searchText, setSearchText] = useState(null);
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("user-token");
      if (token) {
        const getUserInfo = await getProfile(token);
        setUserInfo(getUserInfo);
      }

      const res = await getAllCates();
      setCateList(res[0]);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (searchText) {
        const listProducts = await getAllProducts();
        setProducts(
          listProducts?.filter((item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase())
          )
        );
      }
    })();
  }, [searchText]);

  return (
    <>
      <div className="min-[600px]:hidden">
        <div className="flex justify-between items-center mx-6 py-4">
          <Link href="/">
            <Image src={logo} alt="E-Mobile Shop" />
          </Link>

          <div className="w-[60%] relative">
            <input
              type="text"
              name="search"
              placeholder="Bạn cần tìm gì?"
              onChange={(e) => setSearchText(e.target.value)}
              className="border-2 rounded-xl font-medium text-sm p-3 drop-shadow-xl focus:outline-none focus:text-primary_color w-full"
            />

            <div className="cursor-pointer drop-shadow-xl bg-gradient-to-t from-primary_color to-sub_primary_color py-3 px-3 rounded-2xl absolute -top-2 right-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>

            {searchText && (
              <div className="absolute w-full top-12 left-0 right-0 h-[200px] flex flex-col gap-y-2 px-2 py-2 overflow-y-auto bg-white rounded-xl z-50">
                {products?.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between cursor-pointer hover:border-2 hover:rounded-xl"
                    onClick={() => router.push(`/product/${item.slug}`)}
                  >
                    <div className="flex justify-between items-center">
                      <Image
                        src={item?.image?.[0]}
                        alt={item?.image?.[0]}
                        width={52}
                        height={52}
                        className="object-cover"
                      />
                      <p className="text-primary_color text-sm line-clamp-2">
                        {item?.name}
                      </p>
                    </div>
                    <p className="text-sub_primary_color text-xs">
                      {item?.price} đ
                    </p>
                  </div>
                ))}
                {!products?.length && (
                  <p className="text-sub_primary_color text-sm">
                    Không có sản phẩm phù hợp với từ khóa trên
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-[600px]:hidden">
        <div className="flex justify-center bg-primary_color py-1">
          <div className="flex items-center">
            <span className="animate-pulse h-4 w-4 rounded-full bg-white opacity-75"></span>
            <p className="text-xs font-semibold px-3 block">
              Cơ hội sở hữu Samsung S20 FE 256GB chỉ với 6.990.000đ - SL có hạn
            </p>
            <div className="animate-pulse text-primary_color text-xs bg-white py-1 px-2 rounded">
              Xem chi tiết
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mx-24 py-4">
          <Link href="/">
            <Image src={logo} alt="E-Mobile Shop" />
          </Link>

          <div className="w-[45%] relative">
            <input
              type="text"
              name="search"
              placeholder="Bạn cần tìm gì?"
              onChange={(e) => setSearchText(e.target.value)}
              className="border-2 rounded-xl font-medium text-sm p-3 drop-shadow-xl focus:outline-none focus:text-primary_color w-full"
            />

            <div className="cursor-pointer drop-shadow-xl bg-gradient-to-t from-primary_color to-sub_primary_color py-3 px-3 rounded-2xl absolute -top-2 right-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>

            {searchText && (
              <div className="absolute w-full top-12 left-0 right-0 h-[200px] flex flex-col gap-y-2 px-2 py-2 overflow-y-auto bg-white rounded-xl z-50">
                {products?.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between cursor-pointer hover:border-2 hover:rounded-xl"
                    onClick={() => router.push(`/product/${item.slug}`)}
                  >
                    <div className="flex justify-between items-center">
                      <Image
                        src={item?.image?.[0]}
                        alt={item?.image?.[0]}
                        width={52}
                        height={52}
                        className="object-cover"
                      />
                      <p className="text-primary_color text-sm line-clamp-2">
                        {item?.name}
                      </p>
                    </div>
                    <p className="text-sub_primary_color text-xs">
                      {item?.price} đ
                    </p>
                  </div>
                ))}
                {!products?.length && (
                  <p className="text-sub_primary_color text-sm">
                    Không có sản phẩm phù hợp với từ khóa trên
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="flex">
            <div
              onClick={() => {
                userInfo ? router.push("/cart") : router.push("/login");
              }}
              className="cursor-pointer w-28 flex items-center rounded-lg bg-primary_color p-2 space-x-2 border-2 border-primary_color mr-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <circle cx="10" cy="20.5" r="1" />
                <circle cx="18" cy="20.5" r="1" />
                <path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1" />
              </svg>
              <p className="text-xs font-medium">Giỏ hàng</p>
            </div>
            <Link
              href={userInfo ? "/profile" : "/login"}
              className="w-28 flex items-center rounded-lg bg-white p-2 space-x-2 border-2 border-primary_color"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#00483D"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <p className="text-xs font-medium text-primary_color line-clamp-1">
                {userInfo ? userInfo?.name?.split(" ").pop() : "Đăng nhập"}
              </p>
            </Link>
          </div>
        </div>

        {/* navigator */}
        <div className="flex justify-around items-center mx-24 my-2 bg-primary_color rounded-lg relative">
          {headerItem.map((item, index) => (
            <Link
              href={`/cate/${item.link}`}
              className="group cursor-pointer flex flex-col items-center space-y-3 py-2"
              key={index}
            >
              {item.icon}
              <p className="px-2 text-xs font-medium group-hover:font-semibold group-hover:underline group-hover:underline-offset-2 group-hover:decoration-4 group-hover:decoration-[#f7941e]">
                {item.name.toUpperCase()}
              </p>

              <div className="absolute hidden group-hover:block left-0 top-14 w-full z-50">
                <div className="drop-shadow-2xl rounded p-3 my-1 bg-white">
                  {Object.keys(cateList ?? {}).length
                    ? viewCate(cateList[item.link], item.link)
                    : null}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;
