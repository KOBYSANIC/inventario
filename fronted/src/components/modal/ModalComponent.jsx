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

const ModalComponent = ({ modal, form, children, formStep = false }) => {
  return (
    <>
      <Modal isOpen={modal.isOpen} onClose={modal.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modal.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Form
              formStep={formStep}
              formData={form.formData}
              schema={form.schema}
              onSubmit={form.onSubmit}
              handleFormSubmit={form.handleFormSubmit}
            >
              {children}
            </Form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalComponent;
