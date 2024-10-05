import { useEffect, useState } from "react";
import { registerUser } from "@/app/api/userService/createUser";
import {
  Input,
  Select,
  Button,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
  AlertTitle,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";

interface UserData {
  name: string;
  email: string;
  password: string;
  role: string;
  sector: string;
  isActive: boolean;
}

export function CreateUser() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState<UserData>({
    name: "",
    email: "",
    password: "",
    role: "MANAGER",
    sector: "OPERACIONAL",
    isActive: true,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    try {
      await registerUser(formData);
      setSuccessMessage("Funcionário registrado com sucesso!");

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "MANAGER",
        sector: "OPERACIONAL",
        isActive: true,
      });

      // Limpa o alerta após 5 segundos
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);

    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage("Erro ao registrar funcionário: " + error.response?.data.message);
      } else {
        setErrorMessage("Erro desconhecido ao registrar funcionário");
      }
    } finally {
      setLoading(false);
    }
  };

  // Limpa a mensagem de erro após 5 segundos
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return () => clearTimeout(timer); // Limpa o timer ao desmontar o componente ou mudar a mensagem
    }
  }, [errorMessage]);

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        Cadastrar
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={{ base: "full", md: "md" }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cadastrar Funcionário</ModalHeader>
          <ModalCloseButton />
          <ModalBody padding={6}>
            {/* Formulário */}
            <form onSubmit={handleSubmit}>
              <FormControl mb={4}>
                <FormLabel>Nome</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nome"
                  required
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Senha</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Senha"
                  required
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Cargo</FormLabel>
                <Select name="role" value={formData.role} onChange={handleChange} required>
                  <option value="MANAGER">Gerente</option>
                  <option value="EMPLOYEE">Funcionário</option>
                </Select>
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Setor</FormLabel>
                <Select name="sector" value={formData.sector} onChange={handleChange} required>
                  <option value="OPERACIONAL">Operacional</option>
                  <option value="COMERCIAL">Comercial</option>
                  <option value="FINANCEIRO">Financeiro</option>
                </Select>
              </FormControl>

              <Button
                type="submit"
                colorScheme="blue"
                width="full"
                isLoading={loading}
                spinner={<Spinner size="sm" />}
              >
                Registrar Funcionário
              </Button>
            </form>

            {/* Mensagens de erro ou sucesso abaixo do formulário */}
            {errorMessage && (
              <Alert status="error" mt={4}>
                <AlertIcon />
                <AlertTitle>{errorMessage}</AlertTitle>
              </Alert>
            )}

            {successMessage && (
              <Alert status="success" mt={4}>
                <AlertIcon />
                <AlertTitle>{successMessage}</AlertTitle>
              </Alert>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
