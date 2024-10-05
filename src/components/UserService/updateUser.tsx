import { useState } from "react";
import { updateUserById } from "@/app/api/userService/updateUser";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Input,
    Select,
    Button,
    Alert,
    AlertIcon,
} from "@chakra-ui/react";

interface EditUserProps {
    id: string;
    name: string;
    email: string;
    role: string;
    sector: string;
    onClose: () => void; // Função para fechar o modal
}

enum Roles {
    MANAGER = "MANAGER",
    EMPLOYEE = "EMPLOYEE",
}

export const EditUser: React.FC<EditUserProps> = ({ id, name, email, role, sector, onClose }) => {
    const [formData, setFormData] = useState({
        name,
        email,
        role,
        sector,
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage('');
        setLoading(true);

        try {
            await updateUserById(id, formData);
            onClose(); // Fecha o modal após a edição
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage('Erro desconhecido ao editar funcionário');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={true} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Editar Funcionário</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {errorMessage && (
                        <Alert status="error" mb={4}>
                            <AlertIcon />
                            {errorMessage}
                        </Alert>
                    )}
                    <form onSubmit={handleSubmit}>
                        <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Nome"
                            mb={4}
                            required
                        />
                        <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            mb={4}
                            required
                        />
                        <Select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            placeholder="Selecione um cargo"
                            mb={4}
                            required
                        >
                            <option value={Roles.MANAGER}>Gerente</option>
                            <option value={Roles.EMPLOYEE}>Funcionário</option>
                        </Select>
                        <Select
                            name="sector"
                            value={formData.sector}
                            onChange={handleChange}
                            placeholder="Selecione um setor"
                            mb={4}
                            required
                        >
                            <option value="OPERACIONAL">OPERACIONAL</option>
                            <option value="COMERCIAL">COMERCIAL</option>
                            <option value="FINANCEIRO">FINANCEIRO</option>
                        </Select>

                        <Button type="submit" colorScheme="blue" isLoading={loading}>
                            Salvar Alterações
                        </Button>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
