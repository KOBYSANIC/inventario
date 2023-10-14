import { FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import React from "react";
import { Controller } from "react-hook-form";

const FormInputs = ({ formData, register, errors, control }) => {
  return formData.map((input) => {
    return (
      <div key={input.name}>
        <FormControl>
          <FormLabel>{input.label}</FormLabel>
          {input.type === "select" ? (
            <Controller
              name={input.name} // Nombre del campo en los datos del formulario
              control={control} // Proporciona el controlador de React Hook Form
              defaultValue="1" // Valor por defecto
              rules={{ required: "Este campo es obligatorio" }} // Reglas de validación
              render={({ field }) => (
                <Select id={input.name} {...field}>
                  {input.options.map((opcion) => {
                    return (
                      <option key={opcion.value} value={opcion.value}>
                        {opcion.label}
                      </option>
                    );
                  })}
                </Select>
              )}
            />
          ) : (
            <Input {...register(input.name)} type={input.type} />
          )}
          <p style={{ color: "red" }}>{errors[input.name]?.message}</p>
        </FormControl>
      </div>
    );
  });
};

export default FormInputs;
