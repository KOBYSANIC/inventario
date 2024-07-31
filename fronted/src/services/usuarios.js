import axios from "axios";
import useTokenLocalStorage from "../hooks/user/useTokenLocalStorage ";
import toast from "react-hot-toast";
const urlMenu = "http://localhost:8000/api/users/";

const { getToken } = useTokenLocalStorage("userToken");

const token = getToken();

export const getUsuario = async () => {
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

export const inactivarUsuario = async (id) => {
  try {
    const response = await axios.put(`${urlMenu}${id}/inactivate_user/`, null, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    toast.success("Usuario inactivado con exito");
    const inactivarUsuario = response.data;
    return inactivarUsuario;
  } catch (e) {
    toast.error("Error al inactivar el usuario");
    throw e.response;
  }
};

export const activarUsuario = async (id) => {
  try {
    const response = await axios.put(`${urlMenu}${id}/activate_user/`, null, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    toast.success("Usuario activado con exito");
    const activarUsuario = response.data;
    return activarUsuario;
  } catch (e) {
    toast.error("Error al activar el usuario");
    throw e.response;
  }
};
