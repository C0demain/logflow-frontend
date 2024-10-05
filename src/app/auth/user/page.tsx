"use client";

import { CreateUser } from "@/components/UserService/createUser";
import { ReadUsers } from "@/components/UserService/listUser";
import {
  Box,
  Heading,
  Flex,
} from "@chakra-ui/react";

export default function UserPage() {
  return (
    <Box m={5} position="relative">
      <Flex justifyContent="space-between" alignItems="center" mb={5}>
        <Heading size="lg">Lista de Funcionários:</Heading>
        <CreateUser /> {/* Importa o componente CreateUser */}
      </Flex>

      <Box display="flex" flexDirection={{ base: "column", sm: "row" }} mb={5}>
        <Box flex="1">
          {/* Placeholder for the client list or other content can go here */}
        </Box>
      </Box>

      <Box>
        <ReadUsers />
      </Box>
    </Box>
  );
}
