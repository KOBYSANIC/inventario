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
  Button,
  Image,
  Box,
} from "@chakra-ui/react";

import iconExcel from "../../../assets/svgExcel.svg"

import { DownloadTableExcel } from 'react-export-table-to-excel';

import moment from 'moment';

// services
import { getReportes } from "../../../services/producto";

// react
import { useEffect, useRef, useState } from "react";
import TableComponent from "../../table/TableComponent";

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

  const columns = [
    {
      Header: " ",
      columns: [
        {
          Header: "Nombre",
          accessor: "nombre",
        },
        {
          Header: "Cantida de adopciones",
          accessor: "total_venta",
        },
        {
          Header: "Primera adopción",
          accessor: (data) => {
            return (
              <Text>
                {data.primera_venta
                  ? moment(data.primera_venta).format("MMM DD YYYY")
                : "Sin adopciones"}
              </Text>
            );
          },

        },
        {
          Header: "Ultima adopción",
          accessor: (data) => {
            return (
              <Text >
                {data.ultima_venta
                  ? moment(data.ultima_venta).format("MMM DD YYYY")
                : "Sin adopciones"}
              </Text>
            );
          },
        },
       
      ],
    },
  ];

  const tableRef = useRef(null);
  

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
              <Flex>
              <Text as={"span"} color={"green.400"} flex="1">
                Reportes
              </Text>
              
              <Box position="relative" flex="1" textAlign="end">
                <DownloadTableExcel
                          position="absolute"
                          filename="Reporte de adopciones"
                          sheet="Reporte"
                          currentTableRef={tableRef.current}
                      >
                        <Button leftIcon={<Image
                            src={iconExcel}
                            alt="iconExcel"
                            width="20px"
                            
                          />} colorScheme='teal' variant='solid'>
                          Exportar reporte a Excel
                        </Button>
                      </DownloadTableExcel>
              </Box>
              </Flex>
              <Text fontSize={"18px"} color={"gray.500"}>
                Registro de adopciones
              </Text>
              
            </Flex>
          </Heading>
          
          <TableComponent variant="simple" firsThree columns={columns} tableRef={tableRef} data={date || [{}]} />

        </Stack>
      </Container>

    </>
    
  );
}

export default ReportesForm;
