// libraries
import {
  Text,
  Container,
  Stack,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Flex,
} from "@chakra-ui/react";

// services
import { getReportes } from "../../../services/producto";

// react
import { useEffect, useState } from "react";

const producto = [
  {
    id: 3,
    nombre: "Memoria RAM Kingston 16GB",
    primera_venta: "17/02/2021",
    ultima_venta: "17/02/2021",
    total_venta: "85",
  },
  {
    id: 4,
    nombre: "Memoria SSD Kingston 64GB",
    primera_venta: "17/02/2021",
    ultima_venta: "17/02/2021",
    total_venta: "85",
  },
  {
    id: 2,
    nombre: "Teclado Logitech",
    primera_venta: "17/02/2021",
    ultima_venta: "17/02/2021",
    total_venta: "15",
  },
  {
    id: 22,
    nombre: "Mouse logitech",
    primera_venta: "17/02/2021",
    ultima_venta: "17/02/2021",
    total_venta: "15",
  },
];

function ReportesForm() {
  const [date, setData] = useState([]);
  const getResponse = async () => {
    const date = await getReportes();
    setData(date);
  };

  useEffect(() => {
    //trae todo de la base de datos
    getResponse();
  }, []);

  console.log(date);

  return (
    <>
      <Container maxW={"5xl"}>
        <Stack spacing={{ base: 8, md: 10 }} py={{ base: 20, md: 28 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            <Flex flexDirection={"column"}>
              <Text as={"span"} color={"green.400"}>
                Reportes
              </Text>
              <Text fontSize={"18px"} color={"gray.500"}>
                Producto mas vendido
              </Text>
            </Flex>
          </Heading>

          {/* <TableComponent columns={columns} data={data || [{}]} /> */}

          {producto &&
            producto.map((item) => (
              <Stat
                backgroundColor={"white"}
                padding={"15px"}
                borderRadius={"10px"}
                border={"1px"}
                borderColor={"gray.200"}
              >
                <StatLabel color={"green.400"} fontWeight={"bold"}>
                  {item.nombre}
                </StatLabel>
                <StatNumber>{item.total_venta}</StatNumber>
                <StatHelpText color={"gray.500"}>
                  {item.primera_venta} - {item.ultima_venta}
                </StatHelpText>
              </Stat>
            ))}
        </Stack>
      </Container>
    </>
  );
}

export default ReportesForm;
