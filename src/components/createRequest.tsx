"use client";

import { registerOrder } from "@/app/api/orderService/registerOS";
import axios from "axios";
import { useEffect, useState } from "react";

export function CreateRequest() {
  const [title, setTitle] = useState('');
  const [clientRelated, setClientRelated] = useState('');
  const [userId, setUserId] = useState('')
  const status = "PENDENTE";
  const sector = "COMERCIAL"

  const getId = async() => {
    try {
      const response = await axios.get('/api/id');
      setUserId(response.data.id)
    } catch (error) {
      console.error('ID não encontrada')
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await registerOrder({ title, clientRelated, status, userId, sector });
      console.log('Ordem de serviço registrada:', response);
      // Você pode adicionar mais lógica aqui, como limpar o formulário ou exibir uma mensagem de sucesso

      setClientRelated('')
      setTitle('')
      window.location.reload()
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Erro ao registrar ordem de serviço:', error.message);
      } else {
        console.error('Erro desconhecido ao registrar ordem de serviço');
      }
      // Adicione lógica para tratar erros, como exibir uma mensagem de erro
    }
  };

  useEffect(()=>{
    getId();
  })

  return (
    <div>
      <label htmlFor="modal1" className="btn btn-info text-black hover:bg-blue-500">Nova O.S.</label>

      <input type="checkbox" id="modal1" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box bg-white">
          <div className="modal-top mb-5">
            <h1 className="text-2xl">Nova Ordem de Serviço</h1>
          </div>
          <form onSubmit={handleSubmit} className="modal-middle space-y-2">
            <div >
              <label htmlFor="title" className="mr-4">Titulo</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-gray-400 rounded-md border border-black"
              />
            </div>
            <div>
              <label htmlFor="client" className="mr-2">Cliente</label>
              <input
                type="text"
                id="client"
                value={clientRelated}
                onChange={(e) => setClientRelated(e.target.value)}
                className="bg-gray-400 rounded-md border border-black"
              />
            </div>
            <button
              type="submit"
              className="btn bg-blue-600 text-white"
            >
              Registrar ordem de serviço
            </button>
          </form>
          <div className="modal-action">
            <label htmlFor="modal1" className="btn bg-blue-600 text-white">Close!</label>
          </div>
        </div>
      </div>
    </div>
  );
}
