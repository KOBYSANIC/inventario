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

  console.log(data, "data");

  // check box fucntions
  const [checkboxValues, setCheckboxValues] = useState({
    myCheckbox: false,
    myCheckbox2: false,
  });

  const handleFormSubmit = async (dataForm) => {
    const formDataToSend = {
      ...dataForm,
      admin: checkboxValues["1"], // Usar "1" como nombre de checkbox
      vendedor: checkboxValues["2"], // Usar "2" como nombre de checkbox
    };

    isUpdate
      ? await onSubmit({ id: idMenu, data: formDataToSend })
      : await onSubmit(formDataToSend);
    getResponse();
    onClose();
    setCheckboxValues({
      myCheckbox: false,
      myCheckbox2: false,
    });
  };

  const handleDelete = async (id) => {
    await deleteMenu(id);
    getResponse();
  };

  useEffect(() => {
    //trae todo de la base de datos
    getResponse();
  }, []);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    setCheckboxValues({
      ...checkboxValues,
      [name]: checked,
    });
  };
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
      >
        <FormLabel>Rol</FormLabel>
        <Stack spacing={5} direction="row">
          <FormControl>
            <Checkbox
              onChange={handleCheckboxChange}
              colorScheme="red"
              name="1"
            >
              Administrador
            </Checkbox>
          </FormControl>
          <FormControl>
            <Checkbox
              onChange={handleCheckboxChange}
              name="2"
              colorScheme="green"
            >
              Vendedor
            </Checkbox>
          </FormControl>
        </Stack>
      </ContainerComponent>
    </>
  );
}

export default MenuForm;
