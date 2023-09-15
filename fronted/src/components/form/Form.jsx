import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

export default function Form({ formData, schema, handleFormSubmit, children }) {
  const {
    register,
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
              <Input {...register(input.name)} type={input.type} />
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
