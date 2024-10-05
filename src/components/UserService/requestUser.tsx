import { DeleteUser } from "@/components/UserService/deleteUser";
import { EditUser } from "@/components/UserService/updateUser";
import { FaEdit } from "react-icons/fa";
import {
    Box,
    Flex,
    Text,
    IconButton,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
} from "@chakra-ui/react";

interface RequestUserProps {
    name: string;
    email: string;
    role: string;
    sector: string;
    id: string;
    onDelete: (id: string) => void; 
}

const RequestUser: React.FC<RequestUserProps> = ({ name, email, role, sector, id, onDelete }) => {
    const { isOpen, onOpen, onClose } = useDisclosure(); // Hook para controle do modal

    return (
        <Box borderWidth={1} borderRadius="lg" p={4} boxShadow="md" bg="white" mb={4}>
            <Flex justifyContent="space-between" alignItems="center">
                <Box>
                    <Text fontSize="xl" fontWeight="semibold">{name}</Text>
                    <Text color="gray.700">Email: {email}</Text>
                    <Text color="gray.700">Cargo: {role}</Text>
                    <Text color="gray.700">Setor: {sector}</Text>
                </Box>

                {/* Ícones de Editar e Excluir */}
                <Flex alignItems="center" ml="auto" gap={4}>
                    {/* Ícone de Editar */}
                    <IconButton
                        aria-label="Editar usuário"
                        icon={<FaEdit />}
                        variant="outline"
                        colorScheme="blue"
                        onClick={onOpen} // Chama onOpen ao clicar
                    />

                    {/* Ícone de Excluir */}
                    <DeleteUser id={id} onDelete={onDelete} /> 
                </Flex>
            </Flex>

            {/* Modal de Edição */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Editar Usuário</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <EditUser id={id} name={name} email={email} role={role} sector={sector} onClose={onClose} />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={onClose}>Fechar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default RequestUser;
