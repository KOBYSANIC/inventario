// libraries
import * as yup from "yup";
import {
  Button,
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
import { activarUsuario, getUsuario, inactivarUsuario } from "../../../services/usuarios";

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

function UsuarioForm() {
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
    const date = await getUsuario();
    setData(date);
  };

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
    await inactivarUsuario(id);
    getResponse();
  };

  const handleActive = async (id) => {
    await activarUsuario(id);
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
          Header: "Nombre de usuario",
          accessor: "username",
        },
        {
          Header: "Nombres",
          accessor: (value) => {
            const fullName = value?.first_name + " " + value?.last_name;
            return fullName.trim() || "Sin nombre";x
          }
        },
        {
          Header: "Correo",
          accessor: "email",
        },
        {
          Header: "Activo",
          accessor: (value) => {
            return value.active ? "Activo" : "Inactivo";
          }
        },
        {
          Header: "Acciones",
          accessor: (data) => {
            return (
              <>
                <Button
                  onClick={() => {
                    !data?.active ? handleActive(data.id) : handleDelete(data.id);
                  }}
                  bgColor={!data?.active ? "green.300" : "red.300"}
                  color={"white"}
                >
                  {!data?.active ? "Activar Usuario" : "Inactivar Usuario"}
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
        title="Administrar usuarios"
        textButton="Agregar Menú"
        data={data}
        columns={columns}
        hiddenCreate
        form={{
          formData,
          schema,
          onSubmit,
          handleFormSubmit,
        }}
        modal={{
          title: isUpdate == true ? "Actualizar Usuario" : "Agregar Usuario",
          isOpen,
          onOpen,
          onClose,
          setisUpdate,
        }}
      />
    </>
  );
}

export default UsuarioForm;
