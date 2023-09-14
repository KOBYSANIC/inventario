// libraries
import * as yup from "yup";
import { Button, useDisclosure } from "@chakra-ui/react";

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

const schema = yup
  .object({
    nombre_opcion: yup.string().required("El nombre del menú es requerido"),
    link: yup.string().required("Link es requerido"),
  })
  .required();

const formData = [
  {
    type: "text",
    name: "nombre_opcion",
    label: "Nombre menú",
  },
  {
    type: "text",
    name: "link",
    label: "Enlace del menú",
  },
];

function MenuForm() {
  // state
  const [data, setData] = useState([]);
  const [isUpdate, setisUpdate] = useState(false);
  const [idMenu, setIdMenu] = useState(null);

  // fomrs
  const { error, onSubmit } = useSubmitForm(
    !isUpdate ? createdMenu : updateMenu
  );

  // modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getResponse = async () => {
    const date = await getMenu();
    setData(date);
  };

  const handleFormSubmit = async (dataForm) => {
    isUpdate ? await onSubmit({id:idMenu,data:dataForm}) : await onSubmit(dataForm);
    getResponse();
    onClose();
  };

  const handleDelete = async (id) => {
    await deleteMenu(id);
    getResponse();
  };

  useEffect(() => { //trae todo de la base de datos
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
          accessor: "nombre_opcion",
        },
        {
          Header: "Link",
          accessor: "link",
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
        title="Administrar menú"
        textButton="Agregar Menú"
        data={data}
        columns={columns}
        form={{
          formData,
          schema,
          onSubmit,
          handleFormSubmit,
        }}
        modal={{
          title: isUpdate == true ? "Actualizar Menu" : "Agregar Menu",
          isOpen,
          onOpen,
          onClose,
          setisUpdate,
        }}
      />
    </>
  );
}

export default MenuForm;
