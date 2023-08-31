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
  
  export default function Form({
    title,
    formData,
    schema,
    handleFormSubmit,
  }) {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    });
    return (
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            {title}
          </Heading>
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
            <Stack spacing={6} mt='20px'>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                type="submit"
              >
                Guardar
              </Button>
            </Stack>
          </form>
        </Stack>
      </Flex>
    );
  }