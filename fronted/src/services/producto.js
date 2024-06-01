import axios from "axios";
import useTokenLocalStorage from "../hooks/user/useTokenLocalStorage ";
import { toast } from "react-hot-toast";
const urlProducto = "http://localhost:8000/api/producto/";

const { getToken } = useTokenLocalStorage("userToken");

const token = getToken();

export const getProducto = async () => {
  try {
    const response = await axios.get(`${urlProducto}`, {
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

export const createdProduct = async (data) => {
  try {
    const response = await axios.post(urlProducto, data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const createdProducto = response.data;
    toast.success("Registro agregado con éxito");
    return createdProducto;
  } catch (e) {
    toast.error("Error al agregar el registro");
    throw e.response;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${urlProducto}${id}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const deletedProducto = response.data;
    toast.success("Registro eliminado con éxito");
    return deletedProducto;
  } catch (e) {
    toast.error("Error al eliminar el registro");
    throw e.response;
  }
};

export const updateProduct = async (data) => {
  try {
    const response = await axios.put(`${urlProducto}${data.id}/`, data.data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const updatedProducto = response.data;
    toast.success(`Registro ${data.id} actualizado con éxito`);
    return updatedProducto;
  } catch (e) {
    toast.error("Error al actualizar el registro");
    throw e.response;
  }
};

export const getReportes = async () => {
  try {
    const response = await axios.get(`${urlProducto}reportes`, {
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
