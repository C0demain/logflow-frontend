"use client";

import { useState } from "react";
import { SelectClient } from "../ClientService/selectClient";
import { registerOrder } from "@/app/api/orderService/registerOrder";

interface CreateOrderProps {
  id: string,
}

export const CreateOrder: React.FC<CreateOrderProps> = ({ id }) => {
  const [title, setTitle] = useState('');
  const [clientObj, setClientObj] = useState<any>()
  const userId = id
  const status = "PENDENTE";
  const sector = "COMERCIAL"

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let clientId = clientObj.value
    try {
      const response = await registerOrder({ title, clientId, status, userId, sector });
      console.log('Ordem de serviço registrada:', response);

      setTitle('')
      clientId = ''
      window.location.reload()
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Erro ao registrar ordem de serviço:', error.message);
      } else {
        console.error('Erro desconhecido ao registrar ordem de serviço');
      }

    }
  };

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
              <SelectClient controlState={[clientObj, setClientObj]} dataKey={"id"} />
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
