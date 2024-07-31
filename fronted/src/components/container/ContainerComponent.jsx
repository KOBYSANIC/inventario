// libraries
import { Container, Heading, Stack, Text, Button } from "@chakra-ui/react";
import TableComponent from "../table/TableComponent";
import ModalComponent from "../modal/ModalComponent";

// services

// components

// hooks

const ContainerComponent = ({
  title,
  textButton,
  data,
  columns,
  form,
  modal,
  children,
  formStep = false,
  selectedItems = () => ({}),
  setSelectedItems = () => ({}),
  hiddenCreate = false,
}) => {
  return (
    <>
      <Container maxW={"5xl"}>
        <Stack spacing={{ base: 8, md: 10 }} py={{ base: 20, md: 28 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            <Text as={"span"} color={"green.400"}>
              {title}
            </Text>
          </Heading>
          {!hiddenCreate && (
            <Button
              rounded={"full"}
              mr="30px"
              colorScheme={"orange"}
              bg={"green.400"}
              _hover={{ bg: "green.500" }}
              w={"200px"}
              onClick={() => {
                modal.onOpen();
                modal.setisUpdate(false);
              }}
            >
              {textButton}
            </Button>
          )}
          <TableComponent columns={columns} data={data || [{}]} />
          <ModalComponent
            formStep={formStep}
            modal={modal}
            form={form}
            setSelectedItems={setSelectedItems}
            selectedItems={selectedItems}
          >
            {children}
          </ModalComponent>
        </Stack>
      </Container>
    </>
  );
};

export default ContainerComponent;
