"use client";

import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import CreateButton from "../createButton";

export function CreateDocuments() {
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

    // Simulação de envio de arquivo
    setTimeout(() => {
      setLoading(false);
      toast({
        status: "success",
        title: "Upload realizado com sucesso",
        description: `Arquivo ${file.name} foi enviado.`,
      });
      setFile(null); // Limpa o estado do arquivo após o upload
    }, 2000);
  };

  return (
    <div>
      <CreateButton>
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
      </CreateButton>
    </div>
  );
}