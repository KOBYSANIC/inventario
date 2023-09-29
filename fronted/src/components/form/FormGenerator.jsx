//estilos
import "./FormGenerator.css";

// Libraries
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// context
import { InterfaceContext } from "../../context/Interface";

// react
import { useContext } from "react";

function FormGenerator({ formData, schema, headers, handleFormSubmit }) {
  const { showLogin, setShowLogin } = useContext(InterfaceContext);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  const opcionesFrutas = [
    { value: "manzana", label: "Manzana" },
    { value: "banana", label: "Banana" },
    { value: "naranja", label: "Naranja" },
    { value: "fresa", label: "Fresa" },
  ];
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="form-generator">
      <h2 className="form-title">{headers.title}</h2>
      {formData.map((input) => {
        return (
          <div key={input.name} className="form-field">
            <label htmlFor={input.name} className="form-label">
              {input.label}
            </label>
            {input.type === "select" ? (
              <Controller
                name={input.name} // Nombre del campo en los datos del formulario
                control={control} // Proporciona el controlador de React Hook Form
                defaultValue="1" // Valor por defecto
                rules={{ required: "Este campo es obligatorio" }} // Reglas de validación
                render={({ field }) => (
                  <select id={input.name} {...field}>
                    {input.options.map((opcion) => {
                      return (
                        <option key={opcion.value} value={opcion.value}>
                          {opcion.label}
                        </option>
                      );
                    })}
                  </select>
                )}
              />
            ) : (
              <input
                {...register(input.name)}
                type={input.type}
                className="form-input"
              />
            )}

            <p className="form-error">{errors[input.name]?.message}</p>
          </div>
        );
      })}
      <input type="submit" className="form-submit-button" value="Registrar" />
      <p className="form-message">
        {headers.message}
        <button onClick={toggleForm} className="form-sign-up-button">
          Ingresar
        </button>
      </p>
    </form>
  );
}
export default FormGenerator;
