"use client";

import { useState } from "react";
import { SelectClient } from "../ClientService/selectClient";
import { registerOrder } from "@/app/api/orderService/registerOrder";
import {
  Alert,
  AlertIcon,
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

interface CreateOrderProps {
  id: string;
  onAddOrder: (newOrder: { id: string; title: string; status: string; sector: string; client: { clientName: string } }) => void; // Define a prop para adicionar a nova ordem
}

interface ClientOption {
  label: string;
  value: string;
}

export const CreateOrder: React.FC<CreateOrderProps> = ({ id, onAddOrder }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [clientObj, setClientObj] = useState<ClientOption | null>(null);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const userId = id;
  const status = "PENDENTE";
  const sector = "COMERCIAL";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const clientId = clientObj?.value || '';
  
    try {
      const response = await registerOrder({ title, clientId, status, userId, sector });
      console.log("Ordem de serviço registrada:", response);
      
      const newOrder = {
        id: response.serviceOrder.id, 
        title,
        status,
        sector,
        client: { clientName: clientObj?.label || "" },
      };
  
      onAddOrder(newOrder); 
  
      setAlert({ type: "success", message: "Ordem de serviço registrada com sucesso!" });
      setTitle("");
      setClientObj(null);
      
      // Limpa o alerta após 3 segundos
      setTimeout(() => {
        setAlert(null);
      }, 3000);

    
    } catch (error: unknown) {
      if (error instanceof Error) {
        setAlert({ type: "error", message: `Erro ao registrar ordem de serviço: ${error.message}` });
      } else {
        setAlert({ type: "error", message: "Erro desconhecido ao registrar ordem de serviço" });
      }
      
      // Limpa o alerta após 3 segundos, caso haja erro
      setTimeout(() => {
        setAlert(null);
      }, 3000);
    }
  };
  

  return (
    <Box>
      <Button onClick={onOpen} colorScheme="blue">
        Nova Ordem de Serviço
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nova Ordem de Serviço</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl mb={4}>
                <FormLabel htmlFor="title">Título</FormLabel>
                <Input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Escolha um título"
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel htmlFor="client">Cliente</FormLabel>
                <SelectClient controlState={[clientObj, setClientObj]} dataKey={"id"} />
              </FormControl>
              <Button type="submit" colorScheme="blue" width="full">
                Registrar ordem de serviço
              </Button>
            </form>
            {alert && (
              <Alert status={alert.type} mt={4}>
                <AlertIcon />
                {alert.message}
              </Alert>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} colorScheme="blue">
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
