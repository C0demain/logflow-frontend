import { deleteUserById } from "@/app/api/userService/deleteUser"; 
import { FaTrash } from "react-icons/fa";
import {
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Text,
    Alert,
    AlertIcon,
} from "@chakra-ui/react";
import { useState } from "react";

interface DeleteUserProps {
    id: string;            
    onDelete: (id: string) => void; 
}

export const DeleteUser: React.FC<DeleteUserProps> = ({ id, onDelete }) => {
    const { isOpen, onOpen, onClose } = useDisclosure(); 
    const [errorMessage, setErrorMessage] = useState<string>(""); 

    const handleDelete = async (id: string) => {

        try {
            const response = await deleteUserById(id); 
            console.log('Funcionário deletado:', response);
            onDelete(id); 
            onClose(); // Fecha o modal após a exclusão
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Erro ao deletar funcionário:', error.message);
            } else {
                console.error('Erro desconhecido ao deletar funcionário');
            }
        }
    };

    return (
        <div>
            <Button
                leftIcon={<FaTrash />}
                colorScheme="red"
                variant="outline"
                onClick={onOpen}
            >
                Deletar Funcionário
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirmação de Exclusão</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {errorMessage && ( // Exibe a mensagem de erro, se existir
                            <Alert status="error" mb={4}>
                                <AlertIcon />
                                {errorMessage}
                            </Alert>
                        )}
                        <Text>Deseja realmente excluir esse funcionário?</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={onClose}>
                            Não
                        </Button>
                        <Button
                            colorScheme="red"
                            ml={3}
                            onClick={() => handleDelete(id)}
                        >
                            Sim
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};
