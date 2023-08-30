// libraries
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
} from "@chakra-ui/react";

// services
import { loginUser } from "../../../services/user";

// components

// hooks
import useSubmitForm from "../../../hooks/user/onSubmit";
import { useContext } from "react";
import { InterfaceContext } from "../../../context/Interface";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
  .object({
    username: yup.string().required("El nombre de usuario es requerido"),
    password: yup
      .string()
      .min(2, "La contraseña debe tener al menos 4 caracteres")
      .required("La contraseña es requerida"),
  })
  .required();

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

function Signin() {
  const { error, onSubmit } = useSubmitForm(loginUser);

  const handleFormSubmit = (data) => {
    onSubmit(data, "login");
  };

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
                <button onClick={toggleForm}>
                  <Text color={"blue.500"}>Registrarse</Text>
                </button>
              </Stack>
              <Button type="submit" colorScheme={"blue"} variant={"solid"}>
                Iniciar Sesión
              </Button>
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
}

export default Signin;
