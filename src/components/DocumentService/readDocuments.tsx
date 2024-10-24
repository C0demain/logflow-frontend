import { useState, useEffect, useCallback } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaDownload } from "react-icons/fa";
import Loading from "@/app/loading";
import { useToast } from "@chakra-ui/react";
import { DeleteDocument } from "./deleteDocuments"; // Componente para exclusão
import DocumentData from "@/app/api/documentsService/DocumentData"; // Interface para dados do documento
import Empty from "@/components/Empty";

const exampleDocuments: DocumentData[] = [
  {
    id: "1",
    name: "Documento 1.pdf",
    uploadDate: new Date("2023-10-01").toLocaleDateString(),
    url: "/documents/doc1.pdf"
  },
  {
    id: "2",
    name: "Documento 2.pdf",
    uploadDate: new Date("2023-10-05").toLocaleDateString(),
    url: "/documents/doc2.pdf"
  }
  // Adicione mais documentos conforme necessário
];

export const ReadDocuments: React.FC = () => {
  const [data, setData] = useState<DocumentData[]>(exampleDocuments);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const handleDelete = async (documentId: string) => {
    try {
      // Aqui você pode adicionar a lógica de exclusão real, se necessário
      setData((prevData) => prevData.filter(doc => doc.id !== documentId));
      toast({
        status: "success",
        title: "Sucesso",
        description: "Documento excluído com sucesso"
      });
    } catch (error) {
      toast({
        status: "error",
        title: "Erro",
        description: "Não foi possível excluir o documento. Tente novamente"
      });
    }
  };

  // Simula o carregamento dos documentos
  const fetchDocuments = useCallback(async () => {
    setLoading(true);
    try {
      // Aqui você pode adicionar a lógica de busca real
      setData(exampleDocuments);
    } catch (error) {
      setError("Não foi possível carregar os documentos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  if (data.length === 0) {
    return <Empty title="Ainda não há documentos cadastrados" description="Faça o upload de um arquivo com o botao '+'"/>
  }

  return (
    <div className="overflow-x-auto">
      <table className="table w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="text-lg px-4 py-2">Nome do Documento</th>
            <th className="text-lg px-4 py-2">Data de Upload</th>
            <th className="text-lg px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-lg">
          {data.map((doc) => (
            <tr key={doc.id} className="hover:bg-gray-100">
              <td className="px-4 py-3">{doc.name}</td>
              <td className="px-4 py-3">{doc.uploadDate}</td>
              <td className="flex justify-center space-x-4 px-4 py-3">
                <a href={doc.url} download>
                  <button>
                    <label className="btn btn-md bg-gray-100 text-black flex items-center hover:bg-gray-300">
                      < FaDownload />
                    </label>
                  </button>
                </a>
                <DeleteDocument id={doc.id} onDelete={handleDelete} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
