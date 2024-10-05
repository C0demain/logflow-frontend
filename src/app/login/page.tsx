'use client'

import { login } from "@/app/api/login";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { 
  Box, 
  Button, 
  FormControl, 
  FormLabel, 
  Input, 
  Heading, 
  Text, 
  VStack, 
  useToast, 
  Spinner, 
  Flex 
} from "@chakra-ui/react";

export default function Login() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const toast = useToast()

  async function logon(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password)
      toast({
        title: "Login realizado com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push('/auth/orderservice');
    } catch (error) {
      toast({
        title: "Erro ao realizar login.",
        description: "Verifique suas credenciais e tente novamente.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Flex minH="100vh" direction={{ base: "column", md: "row" }}>
      <Flex
        flex="1"
        bgGradient="linear(to-r, blue.700, blue.400)"
        align="center"
        justify="center"
      >
        <VStack spacing={4} textAlign="center" color="white" mb={{ base: 12, md: 44 }}>
          <Heading fontSize={{ base: "3xl", md: "4xl" }}>LogFlow</Heading>
          <Text fontSize={{ base: "lg", md: "xl" }}>Sistema de processos de trabalho, colaboração entre equipes e auditoria de atividades.</Text>
        </VStack>
      </Flex>

      <Flex
        flex="1"
        bg="gray.100"
        align="center"
        justify="center"
        p={{ base: 4, md: 8 }}
      >
        <Box w="full" maxW="md" bg="white" p={8} borderRadius="md" boxShadow="md">
          <Heading mb={4} textAlign="center">Olá de novo!</Heading>
          <Text mb={8} textAlign="center">Bem-vindo de volta</Text>

          <form onSubmit={logon}>
            <VStack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digite seu email"
                  focusBorderColor="blue.500"
                  bg="gray.200"
                />
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel>Senha</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  focusBorderColor="blue.500"
                  bg="gray.200"
                />
              </FormControl>

              <Button
                type="submit"
                colorScheme="blue"
                width="full"
                isLoading={loading}
                loadingText="Entrando"
                spinner={<Spinner />}
                disabled={loading}
              >
                Entrar
              </Button>
            </VStack>
          </form>
        </Box>
      </Flex>
    </Flex>
  );
}
