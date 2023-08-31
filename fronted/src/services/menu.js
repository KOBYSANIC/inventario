import axios from "axios";
import useTokenLocalStorage from "../hooks/user/useTokenLocalStorage ";
const urlMenu = "http://localhost:8000/api/menu/";

export const getMenu = async (data) => {
  const { getToken } = useTokenLocalStorage("userToken");
  try {
    const response = await axios.get(`${urlMenu}`,{},
    {
      headers: {
        Authorization: `Token ${getToken}`,
      },
    });
    
    const dataMenu = response.data;
    return dataMenu;
  } catch (e) {
    throw e.response;
  }
};

export const createdMenu = async (data) => {
  try {
    const response = await axios.post(urlMenu, data);
    const createdMenu = response.data;
    return createdMenu;
  } catch (e) {
    throw e.response;
  }
};