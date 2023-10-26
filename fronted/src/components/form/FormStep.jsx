import { Button, ButtonGroup, Flex, Progress, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import FormInputs from "./FormInputs";

const FormStep = ({
  formData,
  register,
  errors,
  control,
  formData2 = [],
  setSelectedItems = () => ({}),
  selectedItems = () => ({}),
}) => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(50);
  return (
    <>
      <>
        <Progress hasStripe value={progress} mb="5%" isAnimated></Progress>

        {step === 1 ? (
          <FormInputs
            formData={formData}
            register={register}
            errors={errors}
            control={control}
          />
        ) : (
          <FormInputs
            formData={formData2}
            register={register}
            errors={errors}
            control={control}
            isStep2={true}
            setSelectedItems={setSelectedItems}
            selectedItems={selectedItems}
          />
        )}
        <ButtonGroup mt="5%" w="100%" mb="5%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1);
                  setProgress(progress - 50);
                }}
                isDisabled={step === 1}
                colorScheme="teal"
                variant="solid"
                w="7rem"
                mr="5%"
              >
                Atrás
              </Button>
              <Button
                w="7rem"
                isDisabled={step === 2}
                onClick={() => {
                  setStep(step + 1);
                  if (step === 3) {
                    setProgress(100);
                  } else {
                    setProgress(progress + 50);
                  }
                }}
                colorScheme="teal"
                variant="outline"
              >
                Siguiente
              </Button>
            </Flex>
            {step === 2 ? (
              <Stack spacing={6}>
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
            ) : null}
          </Flex>
        </ButtonGroup>
      </>
    </>
  );
};

export default FormStep;
