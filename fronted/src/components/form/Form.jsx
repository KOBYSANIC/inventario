import { Button, Stack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FormStep from "./FormStep";
import FormInputs from "./FormInputs";

export default function Form({
  formData,
  formData2,
  schema,
  handleFormSubmit,
  children,
  formStep = false,
  setSelectedItems = () => ({}),
  selectedItems = () => ({}),
}) {
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
      {formStep ? (
        <>
          <FormStep
            formData={formData}
            formData2={formData2}
            register={register}
            errors={errors}
            control={control}
            setSelectedItems={setSelectedItems}
            selectedItems={selectedItems}
          />
        </>
      ) : (
        <>
          <FormInputs
            formData={formData}
            register={register}
            errors={errors}
            control={control}
          />
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
        </>
      )}
    </form>
  );
}
