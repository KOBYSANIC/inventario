import React from "react";

import { Box, Heading, Text, VStack, Flex } from "@chakra-ui/react";

import { FaTree } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaCloudSun } from "react-icons/fa";

const Information = () => {
  return (
    <Box py={12}>
      <VStack spacing={2} textAlign="center">
        <Heading as="h1" fontSize="4xl">
          <Flex justifyContent="center">
            Plans <Text color="green">&nbsp;that&nbsp;</Text> fit your need
          </Flex>
          <Flex justifyContent="center">otro texto</Flex>
        </Heading>
        <Text fontSize="lg" color={"gray.500"}>
          Start with 14-day free trial. No credit card needed. Cancel at
          anytime.
        </Text>
      </VStack>
      <Flex justifyContent="center" mt={6} gap={16} flexWrap="wrap">
        <Flex
          flexDirection="column"
          borderRadius={"50px"}
          bgColor="green.100"
          minW={"250px"}
          minH={"200px"}
          w="250px"
          alignItems="center"
          justifyContent="center"
          gap={2}
          p={6}
        >
          <Box color="green.800">
            <FaTree size={"70px"} />
          </Box>
          <Text fontSize="xl" fontWeight="bold">
            CARD 1
          </Text>
          <Text fontSize="lg" textAlign="center" color="gray.700">
            Start with 14-day free trial. No credit card needed. Cancel at
            anytime.
          </Text>
        </Flex>
        <Flex
          flexDirection="column"
          borderRadius={"50px"}
          bgColor="orange.100"
          minW={"250px"}
          w="250px"
          minH={"200px"}
          alignItems="center"
          justifyContent="center"
          gap={2}
          p={6}
        >
          <Box color="orange.800">
            <FaTrash size={"70px"} />
          </Box>
          <Text fontSize="xl" fontWeight="bold">
            CARD 2
          </Text>
          <Text fontSize="lg" textAlign="center" color="gray.700">
            Start with 14-day free trial. No credit card needed. Cancel at
            anytime.
          </Text>
        </Flex>
        <Flex
          flexDirection="column"
          borderRadius={"50px"}
          bgColor="yellow.100"
          minW={"250px"}
          minH={"200px"}
          w="250px"
          alignItems="center"
          justifyContent="center"
          gap={2}
          p={6}
        >
          <Box color="yellow.700">
            <FaCloudSun size={"70px"} />
          </Box>
          <Text fontSize="xl" fontWeight="bold">
            CARD 3
          </Text>
          <Text fontSize="lg" textAlign="center" color="gray.700">
            Start with 14-day free trial. No credit card needed. Cancel at
            anytime.
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Information;
