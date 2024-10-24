// src/interfaces/documentData.ts
export default interface DocumentData {
    id: string;        // Identificador único do documento
    name: string;      // Nome do documento
    uploadDate: string; // Data de upload (pode ser uma string formatada)
    url: string;       // URL para download do documento
  }
  