import { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { Controller } from "react-hook-form";

import TableComponent from "../table/TableComponent";

const FormInputs = ({
  formData,
  register,
  errors,
  control,
  isStep2 = false,
  setSelectedItems = () => ({}),
  selectedItems = () => ({}),
}) => {
  const [selectedOption, setSelectedOption] = useState(0);

  const handleOptionChange = (event) => {
    const selectedIndex = event.target.selectedIndex;
    setSelectedOption(selectedIndex);
  };

  const handleAddItem = () => {
    const selectedItem = {
      id: formData[0].options[selectedOption]?.value,
      nombre: formData[0].options[selectedOption]?.label,
      cantidad: 1,
      preciounitario: formData[0].options[selectedOption]?.precio,
    };

    if (selectedItems[selectedItem.id]) {
      const updatedItems = {
        ...selectedItems,
        [selectedItem.id]: {
          ...selectedItems[selectedItem.id],
          cantidad: selectedItems[selectedItem.id].cantidad + 1,
          subtotal:
            (selectedItems[selectedItem.id].cantidad + 1) *
            selectedItems[selectedItem.id].preciounitario,
        },
      };
      setSelectedItems(updatedItems);
    } else {
      const updatedItems = {
        ...selectedItems,
        [selectedItem.id]: {
          ...selectedItem,
          subtotal: selectedItem.preciounitario,
        },
      };
      setSelectedItems(updatedItems);
    }
  };

  const handleDelete = (id) => {
    const updatedItems = { ...selectedItems };
    delete updatedItems[id];
    setSelectedItems(updatedItems);
  };

  const columns = [
    {
      Header: " ",
      columns: [
        {
          Header: "ID",
          accessor: "id",
        },
        {
          Header: "Nombre",
          accessor: "nombre",
        },
        {
          Header: "Estado",
          accessor: "cantidad",
        },
        {
          Header: "Ingreso",
          accessor: "subtotal",
        },
        {
          Header: "Acciones",
          Cell: ({ row }) => (
            <Button
              colorScheme="red"
              size="sm"
              onClick={() => handleDelete(row.original.id)}
            >
              Eliminar
            </Button>
          ),
        },
      ],
    },
  ];
  return formData.map((input) => {
    return (
      <div key={input.name}>
        <FormControl>
          <FormLabel>{input.label}</FormLabel>
          {input.type === "select" ? (
            <Controller
              name={input.name}
              control={control}
              defaultValue="1"
              rules={{ required: "Este campo es obligatorio" }}
              render={({ field }) => (
                <Select
                  id={input.name}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleOptionChange(e); // Agrega esta línea para manejar el cambio del select
                  }}
                  value={formData[0].options[selectedOption]?.value}
                >
                  {input.options.map((opcion) => (
                    <option key={opcion.value} value={opcion.value}>
                      {opcion.label}
                    </option>
                  ))}
                </Select>
              )}
            />
          ) : (
            <Input
              {...register(input.name)}
              type={input.type}
              disabled={input.disabled || false}
            />
          )}
          <p style={{ color: "red" }}>{errors[input.name]?.message}</p>
        </FormControl>

        {isStep2 && (
          <>
            <Stack spacing={6} mt="20px">
              <Button
                colorScheme="orange"
                bg="green.400"
                _hover={{ bg: "green.500" }}
                mb="16px"
                onClick={handleAddItem}
              >
                Registrar Adopción
              </Button>
            </Stack>

            <TableComponent
              columns={columns}
              data={Object.values(selectedItems)}
            />
          </>
        )}
      </div>
    );
  });
};

export default FormInputs;
