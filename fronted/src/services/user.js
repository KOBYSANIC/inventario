import axios from "axios";
import toast from "react-hot-toast";
const urlUsers = "http://localhost:8000/api/users/";

export const createUser = async (data) => {
  try {
    const response = await axios.post(`${urlUsers}create_user/`, data);
    const createdUser = response.data;
    return createdUser;
  } catch (e) {
    throw e.response;
  }
};

export const loginUser = async (data) => {
  try {
    const response = await axios.post(`${urlUsers}login/`, data);
    const userLogged = response.data;
    return userLogged;
  } catch (e) {
    const message = e?.response?.data?.message || "Error al iniciar sesión";
    toast.error(message);
    throw e.response;
  }
};

export const logoutUser = async (userToken) => {
  try {
    const response = await axios.post(
      `${urlUsers}logout/`,
      {},
      {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      }
    );
    const userLogout = response.data;
    return userLogout;
  } catch (e) {
    throw e.response;
  }
};
