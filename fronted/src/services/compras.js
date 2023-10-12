import axios from "axios";
import useTokenLocalStorage from "../hooks/user/useTokenLocalStorage ";
import { toast } from "react-hot-toast";
const urlcompras = "http://localhost:8000/api/compras/";

const { getToken } = useTokenLocalStorage("userToken");

const token = getToken();

export const getCompras = async () => {
  try {
    const response = await axios.get(`${urlcompras}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const dataCompras = response.data;
    return dataCompras;
  } catch (e) {
    throw e.response;
  }
};

export const createdCompras = async (data) => {
  try {
    const response = await axios.post(urlcompras, data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const createdCompras = response.data;
    toast.success("Compras creado con exito");
    return createdCompras;
  } catch (e) {
    toast.error("Error al crear el Compras");
    throw e.response;
  }
};

export const deleteCompras = async (id) => {
  try {
    const response = await axios.delete(`${urlcompras}${id}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const deletedCompras = response.data;
    toast.success("Compras eliminado con exito");
    return deletedCompras;
  } catch (e) {
    toast.error("Error al eliminar el Compras");
    throw e.response;
  }
};

/*export const updateCompras = async (data) => {
  try {
    const response = await axios.put(`${urlcompras}${data.id}/`, data.data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const updatedCompras = response.data;
    toast.success(`Compras ${data.id} actualizado con exito`);
    return updatedCompras;
  } catch (e) {
    toast.error("Error al actualizar el Compras");
    throw e.response;
  }
};*/
