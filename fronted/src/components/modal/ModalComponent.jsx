import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import Form from "../form/Form";

const ModalComponent = ({ modal, form }) => {
  return (
    <>
      <Modal isOpen={modal.isOpen} onClose={modal.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modal.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Form
              formData={form.formData}
              schema={form.schema}
              onSubmit={form.onSubmit}
              handleFormSubmit={form.handleFormSubmit}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalComponent;
