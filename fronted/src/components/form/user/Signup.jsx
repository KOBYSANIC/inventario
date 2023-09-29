// libraries
import * as yup from "yup";

// services
import { createUser } from "../../../services/user";

// components
import FormGenerator from "../FormGenerator";

// hooks
import useSubmitForm from "../../../hooks/user/onSubmit";
import { Checkbox, FormLabel, Stack } from "@chakra-ui/react";

const schema = yup
  .object({
    first_name: yup.string().required("Los nombres son requeridos"),
    last_name: yup.string().required("Los apellidos son requeridos"),
    email: yup.string().email().required("El correo es requerido"),
    username: yup.string().required("El nombre de usuario es requerida"),
    password: yup
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("La contraseña es requerida"),
  })
  .required();

const formData = [
  {
    type: "text",
    name: "first_name",
    label: "Nombres",
  },
  {
    type: "text",
    name: "last_name",
    label: "Apellidos",
  },
  {
    type: "email",
    name: "email",
    label: "Correo electrónico",
  },
  {
    type: "text",
    name: "username",
    label: "Nombre del usuario",
  },
  {
    type: "password",
    name: "password",
    label: "Contraseña",
  },
  {
    type: "select",
    name: "rol_user",
    label: "Rol",
    options: [
      { value: "1", label: "Administrador" },
      { value: "2", label: "Vendedor" },
    ],
  },
];

const headers = {
  title: "Registro de datos",
  message: "¿Tienes una cuenta?",
};

function Signup() {
  const { error, onSubmit } = useSubmitForm(createUser);

  const handleFormSubmit = (data) => {
    onSubmit(data, "create");
  };

  return (
    <>
      <FormGenerator
        formData={formData}
        schema={schema}
        headers={headers}
        onSubmit={onSubmit}
        handleFormSubmit={handleFormSubmit}
      />
    </>
  );
}

export default Signup;
