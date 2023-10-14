import axios from "axios";
import useTokenLocalStorage from "../hooks/user/useTokenLocalStorage ";
import { toast } from "react-hot-toast";
const urlcompras = "http://localhost:8000/api/compras/";
const urlClientes = "http://localhost:8000/api/clientes/";
const urlProductos = "http://localhost:8000/api/producto/";

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
    toast.success("Compra anulada con exito");
    return deletedCompras;
  } catch (e) {
    toast.error("Error al anular la compra");
    throw e.response;
  }
};
export const getClientes = async () => {
  try {
    const response = await axios.get(urlClientes, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    const dataClientes = response.data.map((cliente) => ({
      value: cliente.id,
      label: cliente.nombre,
    }));

    return dataClientes;
  } catch (e) {
    throw e.response;
  }
};
export const getProductos = async () => {
  try {
    const response = await axios.get(urlProductos, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    const dataProductos = response.data.map((producto) => ({
      value: producto.id,
      label: producto.nombre,
      precio: producto.precio,
    }));

    return dataProductos;
  } catch (e) {
    throw e.response;
  }
};