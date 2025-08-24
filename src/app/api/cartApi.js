import axios from "axios";

const host = "capstoneproject-ff3m.onrender.com";

export const getCart = async (token) => {
  try {
    const res = await axios({
      method: "get",
      url: `${host}/api/cart`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateCart = async (token, formValue) => {
  try {
    const res = await axios({
      method: "patch",
      url: `${host}/api/cart/update`,
      data: {
        orderList: JSON.stringify(formValue),
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
