// libraries
import * as yup from "yup";
import { Button, useDisclosure, Text } from "@chakra-ui/react";

// services
import {
  createdCompras,
  deleteCompras,
  getCompras,
  getClientes,
  getProductos,
} from "../../../services/compras";

// components
import ContainerComponent from "../../container/ContainerComponent";

// hooks
import useSubmitForm from "../../../hooks/user/onSubmit";
import { useEffect, useState } from "react";

const schema = yup
  .object({
    fechaventa: yup.string().required("La fecha requerida"),
  })
  .required();

function CompraForm() {
  // state
  const [data, setData] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  // fomrs
  const { error, onSubmit } = useSubmitForm(createdCompras);

  // modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getResponse = async () => {
    const date = await getCompras();
    setData(date);

    const clientes = await getClientes();
    setClientes(clientes);

    const productos = await getProductos();
    setProductos(productos);
  };

  const handleFormSubmit = async (dataForm) => {
    const formDataToSend = {
      ...dataForm,
      selectedItems: Object.values(selectedItems), // Agrega los elementos seleccionados de la tabla al objeto de datos a enviar
    };

    try {
      await onSubmit(formDataToSend); // Envia los datos al backend
      getResponse();
      onClose();
    } catch (error) {
      console.error("Error al enviar los datos al backend:", error);
    }
  };

  const handleDelete = async (id) => {
    await deleteCompras(id);
    getResponse();
  };

  useEffect(() => {
    //trae todo de la base de datos
    getResponse();
  }, []);

  const formData = [
    {
      type: "select",
      name: "clientes",
      label: "Seleccionar cliente",
      options: clientes || [],
    },
    {
      type: "date",
      name: "fechaventa",
      label: "Fecha de venta",
    },
  ];

  const productosList = [
    {
      value: 1,
      label: "Producto 1",
      precio: 100,
    },
    {
      value: 2,
      label: "Producto 2",
      precio: 200,
    },
    {
      value: 3,
      label: "Producto 3",
      precio: 300,
    },
  ];

  const formData2 = [
    {
      type: "select",
      name: "producto",
      label: "Seleccione Producto",
      options: productos || [],
    },
    // {
    //   type: "number",
    //   name: "totalventa",
    //   label: "Total de la venta",
    //   disabled: true,
    // },
  ];

  const columns = [
    {
      Header: " ",
      columns: [
        {
          Header: "ID",
          accessor: "id",
        },
        {
          Header: "Nombre cliente",
          accessor: "clienteid",
        },
        {
          Header: "Fecha venta",
          accessor: "fechaventa",
        },
        {
          Header: "Total de la venta",
          accessor: "totalventa",
        },
        {
          Header: "Estado de la venta",
          accessor: (data) => {
            return (
              <>
                {data.anulado != 1 ? (
                  <Text
                    bgColor="green.300"
                    borderRadius="5px"
                    color="white"
                    textAlign="center"
                    py="3px"
                  >
                    Venta activa
                  </Text>
                ) : (
                  <Text
                    bgColor="red.300"
                    borderRadius="5px"
                    color="white"
                    textAlign="center"
                    py="3px"
                  >
                    Venta Anulada
                  </Text>
                )}
              </>
            );
          },
        },
        {
          Header: "Acciones",
          accessor: (data) => {
            return (
              <>
                <Button
                  onClick={() => {
                    data.anulado != 1 && handleDelete(data.id);
                  }}
                  bgColor={data.anulado != 1 ? "red.300" : "gray.100"}
                  color={data.anulado != 1 ? "white" : "black"}
                  cursor={data.anulado != 1 ? "cursor" : "not-allowed"}
                >
                  ANULAR
                </Button>
              </>
            );
          },
        },
      ],
    },
  ];

  return (
    <>
      <ContainerComponent
        title="Ventas"
        textButton="Agregar nueva venta"
        data={data}
        columns={columns}
        form={{
          formData,
          formData2,
          schema,
          onSubmit,
          handleFormSubmit,
        }}
        modal={{
          title: "Registrar venta ",
          isOpen,
          onOpen,
          onClose,
          setisUpdate: () => {},
        }}
        formStep
        selectedItems = {selectedItems}
        setSelectedItems = {setSelectedItems}
      ></ContainerComponent>
    </>
  );
}

export default CompraForm;
