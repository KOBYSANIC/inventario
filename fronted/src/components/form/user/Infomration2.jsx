import React from "react";

import { Box, Heading, Text, Image, Flex } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

const Infomration2 = () => {
  return (
    <Flex
      py={12}
      justifyContent="center"
      flexWrap={{ base: "wrap", md: "nowrap" }}
    >
      <Box maxW={"900px"} p={4} w="full">
        <Heading as="h1" fontSize="4xl">
          <Flex>
            Plans <Text color="green">&nbsp;that&nbsp;</Text> fit your need
          </Flex>
          <Flex>otro texto</Flex>
        </Heading>
        <Text fontSize="lg" color={"gray.500"}>
          Start with 14-day free trial. No credit card needed. Cancel at
          anytime.
        </Text>

        <Flex mt={16} flexDirection="column" gap={4}>
          <Flex>
            <Flex
              borderRadius={"50%"}
              bgColor="green.600"
              w={"20px"}
              h={"20px"}
              display="flex"
              alignItems="center"
              justifyContent="center"
              p={4}
            >
              <CheckIcon color="white" />
            </Flex>
            <Text fontSize="lg" color="gray.700" ml={4}>
              Start with 14-day free trial. No credit card needed. Cancel at
              anytime.
            </Text>
          </Flex>

          <Flex>
            <Flex
              borderRadius={"50%"}
              bgColor="green.600"
              w={"20px"}
              h={"20px"}
              display="flex"
              alignItems="center"
              justifyContent="center"
              p={4}
            >
              <CheckIcon color="white" />
            </Flex>
            <Text fontSize="lg" color="gray.700" ml={4}>
              Start with 14-day free trial. No credit card needed. Cancel at
              anytime.
            </Text>
          </Flex>

          <Flex>
            <Flex
              borderRadius={"50%"}
              bgColor="green.600"
              w={"20px"}
              h={"20px"}
              display="flex"
              alignItems="center"
              justifyContent="center"
              p={4}
            >
              <CheckIcon color="white" />
            </Flex>
            <Text fontSize="lg" color="gray.700" ml={4}>
              Start with 14-day free trial. No credit card needed. Cancel at
              anytime.
            </Text>
          </Flex>

          <Flex>
            <Flex
              borderRadius={"50%"}
              bgColor="green.600"
              w={"20px"}
              h={"20px"}
              display="flex"
              alignItems="center"
              justifyContent="center"
              p={4}
            >
              <CheckIcon color="white" />
            </Flex>
            <Text fontSize="lg" color="gray.700" ml={4}>
              Start with 14-day free trial. No credit card needed. Cancel at
              anytime.
            </Text>
          </Flex>
        </Flex>
      </Box>
      <Image
        src="https://img.freepik.com/free-photo/vertical-shot-beautiful-mountain-valley-with-green-trees-covered-mild-fog_181624-5095.jpg?t=st=1722045419~exp=1722049019~hmac=197b2f6606f1ba08368fb638634c8509c80752beffaab6efb80344df58352d48&w=740"
        width="400px"
        borderRadius="20px"
        border="4px solid"
        borderColor="green.900"
        draggable={false}
      />
    </Flex>
  );
};

export default Infomration2;
