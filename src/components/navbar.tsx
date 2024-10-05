'use client';

import { Box, Flex, IconButton, Menu, MenuButton, MenuList, MenuItem, Button, useDisclosure, Stack, HStack } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { Logout } from "./logout";

export function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="#0975BB" px={4} shadow="md">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {/* Logo e Menu Hamburger para mobile */}
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Abrir menu"
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        
        {/* Logo */}
        <HStack spacing={8} alignItems="center">
          <Box color="white" fontWeight="bold" fontSize="xl">
            <Link href="/">LogFlow</Link>
          </Box>
        </HStack>

        {/* Menu para telas grandes */}
        <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }} color="white">
          <Button variant="ghost" colorScheme="white">
            <Link href="/auth/orderservice">Ordens de Serviço</Link>
          </Button>
          <Button variant="ghost" colorScheme="white">
            <Link href="/auth/user">Funcionários</Link>
          </Button>
          <Button variant="ghost" colorScheme="white">
            <Link href="/auth/client">Cliente</Link>
          </Button>
        </HStack>

        {/* Menu de logout e perfil */}
        <Flex alignItems="center">
          <Menu>
              <Logout /> {/* Logout no menu */}
          </Menu>
        </Flex>
      </Flex>

      {/* Menu Dropdown Mobile */}
      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" spacing={4} color="white">
            <Link href="/auth/orderservice">Ordens de Serviço</Link>
            <Link href="/auth/user">Funcionários</Link>
            <Link href="/auth/client">Cliente</Link>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
