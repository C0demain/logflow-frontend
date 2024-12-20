import { useState, useEffect, useCallback } from "react";
import { FaDownload } from "react-icons/fa";
import Loading from "@/app/loading";

import { DeleteDocument } from "./deleteDocuments";
import DocumentData from "@/app/api/documentsService/DocumentData";
import { listDocuments } from "@/app/api/documentsService/listDocuments";
import { deleteDocumentById } from "@/app/api/documentsService/deleteDocument";
import { downloadById } from "@/app/api/documentsService/downloadDocument";
import Empty from "../Shared/Empty";
import useToasts from "@/hooks/useToasts";

interface ReadDocumentsProps {
  userId: string | undefined;
  taskId: string | undefined;
}

export const ReadDocuments: React.FC<ReadDocumentsProps> = ({ userId, taskId }) => {
  const [data, setData] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {showToast, showToastOnReload} = useToasts()

  const getDocuments = useCallback(async () => {
    setLoading(true);
    try {
      const response = await listDocuments("", userId, taskId); // Chama a função de listagem de documentos
      if (Array.isArray(response)) {
        setData(response);
      } else {
        setError("Dados dos documentos não estão no formato esperado.");
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
      setError("Não foi possível carregar os dados dos documentos.");
    } finally {
      setLoading(false);
    }
  }, [taskId]);

  const handleDelete = async (documentId: string) => {
    try {
      // Chama a função de exclusão
      await deleteDocumentById(documentId);
      setData((prevData) => prevData.filter(doc => doc.id !== documentId));
      showToastOnReload("Documento excluído com sucesso", 'success');
      window.location.reload()
    } catch (error) {
      console.error("Error deleting document:", error);
      showToast("Não foi possível excluir o documento. Tente novamente.", 'error')
    }
  };

  const downloadDoc = async (id: string, name: string) => {
    try {
      await downloadById(id, name)
      showToast("Documento baixado com sucesso", 'success')
    } catch (error) {
      console.error("Error deleting document:", error);
      showToast("Não foi possível baixar o documento. Tente novamente.", 'error')
    }
  }

  useEffect(() => {
    getDocuments();
  }, [getDocuments, taskId]);

  if (loading) {
    return (
      <div className="h-full w-full">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  if (data.length === 0) {
    return <div className="flex w-full items-center justify-center"><Empty title="Ainda não há documentos cadastrados" description="Faça o upload de um arquivo com o botao '+'" /></div>
  }

  return (
    <div className="overflow-x-auto h-min">
      <table className="table w-full bg-white shadow-md rounded-lg">
        <thead className="bg-blue-400 text-black rounded-t-lg">
          <tr>
            <th className="text-lg px-4 py-2 rounded-tl-lg">Nome do Documento</th>
            <th className="text-lg px-4 py-2">Data de Upload</th>
            <th className="text-lg px-4 py-2 rounded-tr-lg">Ações</th>
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
                    <label className="btn btn-md bg-gray-100 text-black flex items-center hover:bg-gray-300" onClick={() => downloadDoc(doc.id, doc.name)}>
                      <FaDownload />
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
