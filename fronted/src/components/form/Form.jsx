import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Select,
  Option,
  useColorModeValue,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

export default function Form({ formData, schema, handleFormSubmit, children }) {
  const {
    register, 
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      {formData.map((input) => {
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
                        <Option key={opcion.value} value={opcion.value}>
                          {opcion.label}
                        </Option>
                      );
                    })}
                  </Select>
                )}
              />
            ) : (
              <Input
                {...register(input.name)}
                type={input.type}
              />
            )}
              <p style={{ color: "red" }}>{errors[input.name]?.message}</p>
            </FormControl>
          </div>
        );
      })}
      {children}
      <Stack spacing={6} mt="20px">
        <Button
          bg={"blue.400"}
          color={"white"}
          _hover={{
            bg: "blue.500",
          }}
          type="submit"
          mb="16px"
        >
          Guardar
        </Button>
      </Stack>
    </form>
  );
}
