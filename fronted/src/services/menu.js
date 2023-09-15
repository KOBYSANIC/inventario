import axios from "axios";
import useTokenLocalStorage from "../hooks/user/useTokenLocalStorage ";
import { toast } from "react-hot-toast";
const urlMenu = "http://localhost:8000/api/menu/";

const { getToken } = useTokenLocalStorage("userToken");

const token = getToken();

export const getMenu = async () => {
  try {
    const response = await axios.get(`${urlMenu}`, {
      headers: {
        Authorization: `Token ${token}`,
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
    const response = await axios.post(urlMenu, data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const createdMenu = response.data;
    toast.success("Menu creado con exito");
    return createdMenu;
  } catch (e) {
    toast.error("Error al crear el menu");
    throw e.response;
  }
};

export const deleteMenu = async (id) => {
  try {
    const response = await axios.delete(`${urlMenu}${id}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const deletedMenu = response.data;
    toast.success("Menu eliminado con exito");
    return deletedMenu;
  } catch (e) {
    toast.error("Error al eliminar el menu");
    throw e.response;
  }
};

export const updateMenu = async (data) => {
  try {
    const response = await axios.put(`${urlMenu}${data.id}/`, data.data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const updatedMenu = response.data;
    toast.success(`Menu ${data.id} actualizado con exito`);
    return updatedMenu;
  } catch (e) {
    toast.error("Error al actualizar el menu");
    throw e.response;
  }
};
