// libraries
import * as yup from "yup";

// services
import { createUser } from "../../../services/user";

// components
import FormGenerator from "../FormGenerator";

// hooks
import useSubmitForm from "../../../hooks/user/onSubmit";
import Form from "../Form";
import { createdMenu } from "../../../services/menu";

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
  const { error, onSubmit } = useSubmitForm(createdMenu);

  const handleFormSubmit = (data) => {
    onSubmit(data, "create");
  };

  return (
    <>
      <Form 
        title='Agregar Menu' 
        formData={formData}
        schema={schema}
        onSubmit={onSubmit}
        handleFormSubmit={handleFormSubmit}
      />
    </>
  );
}

export default MenuForm;
