import { deleteOsById } from "@/app/api/orderService/deleteOrder";
import { FaTrash } from "react-icons/fa";
import { useToast, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button } from "@chakra-ui/react";
import { useState, useRef } from "react";

interface DeleteOrderProps {
  id: string;
  onDelete: (id: string) => void; 
}

export const DeleteOrder: React.FC<DeleteOrderProps> = ({ id, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const toast = useToast();

  const handleDelete = async () => {
    try {
      await deleteOsById(id); 

      onDelete(id);

      toast({
        title: "Ordem de serviço deletada.",
        description: "A ordem de serviço foi excluída com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setIsOpen(false);
    } catch (error: unknown) {
    
      toast({
        title: "Erro ao deletar a ordem de serviço.",
        description: error instanceof Error ? error.message : "Erro desconhecido.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button colorScheme="red" onClick={() => setIsOpen(true)}>
        <FaTrash />
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Deletar Ordem de Serviço
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que deseja deletar esta ordem de serviço? Essa ação não pode ser desfeita.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Deletar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
