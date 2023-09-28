//estilos
import "./FormGenerator.css";

// Libraries
import { useForm } from "react-hook-form";
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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="form-generator">
      <h2 className="form-title">{headers.title}</h2>
      {formData.map((input) => {
        return (
          <div key={input.name} className="form-field">
            <label htmlFor={input.name} className="form-label">
              {input.label}
            </label>
            <input
              {...register(input.name)}
              type={input.type}
              className="form-input"
            />
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


