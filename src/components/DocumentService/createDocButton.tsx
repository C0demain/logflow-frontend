"use client";

import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { registerDocument } from "@/app/api/documentsService/registerDocument";
import { FaPlus } from "react-icons/fa";

interface CreateDocumentsProps {
  id: string | undefined;
  taskId: string | undefined;
}

export const CreateDocButton: React.FC<CreateDocumentsProps> = ({ id, taskId }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      toast({
        status: "error",
        title: "Nenhum arquivo selecionado",
        description: "Por favor, selecione um arquivo antes de enviar.",
      });
      return;
    }

    setLoading(true);

    try {
      await registerDocument({ file: file, filename: file.name, userId: id, taskId: taskId });
      toast({
        status: "success",
        title: "Upload realizado com sucesso",
        description: `Arquivo ${file.name} foi enviado.`,
      });
      setFile(null);
    } catch (error) {
      toast({
        status: "error",
        title: "Erro ao enviar o arquivo",
        description: (error as Error).message || "Ocorreu um erro ao enviar o arquivo.",
      });
    } finally {
      setLoading(false);
    }
  }

  const handleModalOpen = () => {
    const modal = document.getElementById("modalDoc");
    if (modal) {
      (modal as HTMLDialogElement).showModal();
    } else {
      console.error("Modal element not found");
    }
  };

  return (
    <>
      <button
        className="btn btn-info btn-sm btn-circle"
        onClick={handleModalOpen}
      >
        <FaPlus />
      </button>

      <dialog className="modal" id="modalDoc">
        <div className="modal-box">
          <h1 className="text-2xl font-semibold mb-4 text-center">Upload de Documentos</h1>
          <form onSubmit={handleUpload} className="flex flex-col modal-middle space-y-4 items-center">
            <div className="flex items-center space-x-4">
              <label className="flex flex-col items-center">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="input input-bordered w-full hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="btn bg-gray-400 hover:bg-gray-500 text-white cursor-pointer"
                >
                  {file ? "Alterar Arquivo" : "Escolher Arquivo"}
                </label>
              </label>

              <p className="text-sm text-gray-500">
                {file ? file.name : "Nenhum arquivo escolhido"}
              </p>
            </div>

            <div className="modal-action flex flex-row justify-around">
              <button type="submit" className="btn btn-info hover:text-white" disabled={loading}>
                {loading ? "Enviando..." : "Enviar Arquivo"}
              </button>
            </div>
          </form>
        </div>
        <form className="modal-backdrop" method="dialog">
          <button>Fechar</button>
        </form>
      </dialog>
    </>
  );
};
