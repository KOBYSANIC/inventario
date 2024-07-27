import React from "react";
import { useContext } from "react";
import { InterfaceContext } from "../../../context/Interface";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  Button,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Box,
} from "@chakra-ui/react";
import useSubmitForm from "../../../hooks/user/onSubmit";
import { loginUser } from "../../../services/user";

const formData = [
  {
    type: "text",
    name: "username",
    label: "Nombre de usuario",
  },
  {
    type: "password",
    name: "password",
    label: "Contraseña",
  },
];

const schema = yup
  .object({
    username: yup.string().required("El nombre de usuario es requerido"),
    password: yup
      .string()
      .min(2, "La contraseña debe tener al menos 4 caracteres")
      .required("La contraseña es requerida"),
  })
  .required();

const LoginRegister = ({setShowViewLoginRegister}) => {
  const { error, onSubmit } = useSubmitForm(loginUser);
  const { showLogin, setShowLogin } = useContext(InterfaceContext);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  const handleFormSubmit = (data) => {
    onSubmit(data, "login");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={4} w={"full"} maxW={"md"}>
            <Heading fontSize={"4xl"}>Bienvenido</Heading>

            {formData.map((input) => {
              return (
                <div key={input.name}>
                  <FormControl>
                    <FormLabel>{input.label}</FormLabel>
                    <Input {...register(input.name)} type={input.type} />
                    <p style={{ color: "red" }}>
                      {errors[input.name]?.message}
                    </p>
                  </FormControl>
                </div>
              );
            })}
            <Stack spacing={6}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <div onClick={toggleForm}>
                  <Text cursor={"pointer"} color={"blue.500"}>
                    Registrarse
                  </Text>
                </div>
              </Stack>
              <Button type="submit" colorScheme={"blue"} variant={"solid"}>
                Iniciar Sesión
              </Button>

              <Box onClick={() => setShowViewLoginRegister(false)}>
                <Text cursor={"pointer"} color={"blue.500"} textDecoration={"underline"}>
                  Regresar a la página principal
                </Text>
              </Box>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={"Login Image"}
            objectFit={"cover"}
            minW={"100%"}
            maxH={"100vh"}
            src={
              "https://images.pexels.com/photos/4483609/pexels-photo-4483609.jpeg?auto=compress&cs=tinysrgb&w=1600"
            }
          />
        </Flex>
      </Stack>
    </form>
  );
};

export default LoginRegister;
