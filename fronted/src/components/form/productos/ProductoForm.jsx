// libraries
import * as yup from "yup";
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";

// services
import {
  createdMenu,
  deleteMenu,
  getMenu,
  updateMenu,
} from "../../../services/menu";

// components
import ContainerComponent from "../../container/ContainerComponent";

// hooks
import useSubmitForm from "../../../hooks/user/onSubmit";
import { useEffect, useState } from "react";
import { createdProduct, deleteProduct, getProducto, updateProduct } from "../../../services/producto";

const schema = yup
  .object({
    nombre: yup.string().required("El nombre del producto es requerido"),
    precio: yup.string().required("El precio es requerido"),
    stockactual: yup.string().required("El stock es requerido"),
  })
  .required();

const formData = [
  {
    type: "text",
    name: "nombre",
    label: "Nombre Producto",
  },
  {
    type: "text",
    name: "precio",
    label: "Precio",
  },
  {
    type: "number",
    name: "stockactual",
    label: "Ingreso del stock",
  },
];

function ProductoForm() {
  // state
  const [data, setData] = useState([]);
  const [isUpdate, setisUpdate] = useState(false);
  const [idMenu, setIdMenu] = useState(null);

  // fomrs
  const { error, onSubmit } = useSubmitForm(
    !isUpdate ? createdProduct : updateProduct
  );

  // modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getResponse = async () => {
    const date = await getProducto();
    setData(date);
  };


  const handleFormSubmit = async (dataForm) => {
    const formDataToSend = {
      ...dataForm,
    };

    isUpdate
      ? await onSubmit({ id: idMenu, data: formDataToSend })
      : await onSubmit(formDataToSend);
    getResponse();
    onClose();
    
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    getResponse();
  };

  useEffect(() => {
    //trae todo de la base de datos
    getResponse();
  }, []);

  const columns = [
    {
      Header: " ",
      columns: [
        {
          Header: "ID",
          accessor: "id",
        },
        {
          Header: "Nombre",
          accessor: "nombre",
        },
        {
          Header: "Precio",
          accessor: "precio",
        },
        {
          Header: "Acciones",
          accessor: (data) => {
            return (
              <>
                <Button
                  onClick={() => {
                    setIdMenu(data.id);
                    onOpen();
                    setisUpdate(true);
                  }}
                  bgColor={"yellow.300"}
                  mr={2}
                >
                  Editar
                </Button>
                <Button
                  onClick={() => {
                    handleDelete(data.id);
                  }}
                  bgColor={"red.300"}
                  color={"white"}
                >
                  Eliminar
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
        title="Administrar Productos"
        textButton="Agregar producto"
        data={data}
        columns={columns}
        form={{
          formData,
          schema,
          onSubmit,
          handleFormSubmit,
        }}
        modal={{
          title: isUpdate == true ? "Actualizar Producto" : "Agregar Producto",
          isOpen,
          onOpen,
          onClose,
          setisUpdate,
        }}
      />
    </>
  );
}

export default ProductoForm;
