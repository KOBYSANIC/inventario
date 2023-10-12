// libraries
import * as yup from "yup";
import {
  Button,
  useDisclosure,
} from "@chakra-ui/react";

// services
import {
  deleteMenu,
  updateMenu,
} from "../../../services/menu";

// components
import ContainerComponent from "../../container/ContainerComponent";

// hooks
import useSubmitForm from "../../../hooks/user/onSubmit";
import { useEffect, useState } from "react";
import { createdCompras, getCompras } from "../../../services/compras";

const schema = yup
  .object({
    fechaventa: yup.string().required("La fecha requerida"),
    totalventa: yup.string().required("El total es requerido"),
  })
  .required();

const formData = [
  {
    type: "date",
    name: "fechaventa",
    label: "Fecha de venta",
  },
  {
    type: "number",
    name: "totalventa",
    label: "Total de la venta",
  },
];

function CompraForm() {
  // state
  const [data, setData] = useState([]);

  // fomrs
  const { error, onSubmit } = useSubmitForm(
    createdCompras 
  );

  // modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getResponse = async () => {
    const date = await getCompras();
    setData(date);
  };

  const handleFormSubmit = async (dataForm) => {

    const formDataToSend = {
      ...dataForm,
    };

    await onSubmit(formDataToSend);
    getResponse();
    onClose();
  };

  const handleDelete = async (id) => {
    await deleteMenu(id);
    getResponse();
  };

  useEffect(() => {
    //trae todo de la base de datos
    getResponse();
  }, []);

  const columns = [
    {
      Header: " ",
      columns: [
        {
          Header: "ID",
          accessor: "id",
        },
        {
          Header: "Nombre cliente",
          accessor: "clienteid",
        },
        {
          Header: "Fecha venta",
          accessor: "fechaventa",
        },
        {
          Header: "Total de la venta",
          accessor: "totalventa",
        },
        {
          Header: "Acciones",
          accessor: (data) => {
            return (
              <>
                {/* <Button
                  onClick={() => {
                    setIdMenu(data.id);
                    onOpen();
                    setisUpdate(true);
                  }}
                  bgColor={"yellow.300"}
                  mr={2}
                >
                  Editar
                </Button> */}
                <Button
                  onClick={() => {
                    handleDelete(data.id);
                  }}
                  bgColor={"red.300"}
                  color={"white"}
                >
                  ANULAR
                </Button>
              </>
            );
          },
        },
      ],
    },
  ];

  return (
    <>
      <ContainerComponent
        title="Compras"
        textButton="Agregar nueva compra"
        data={data}
        columns={columns}
        form={{
          formData,
          schema,
          onSubmit,
          handleFormSubmit,
        }}
        modal={{
          title:"Registrar Compra",
          isOpen,
          onOpen,
          onClose,
          setisUpdate : ()=>{},
        }}
      >
      </ContainerComponent>
    </>
  );
}

export default CompraForm;
