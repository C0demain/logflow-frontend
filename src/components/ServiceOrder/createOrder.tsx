"use client";

import { useState } from "react";
import { SelectClient } from "../ClientService/selectClient";
import { registerOrder } from "@/app/api/serviceOrder/registerOrder";

import { isAxiosError } from "axios";
import CreateButton from "../Shared/createButton";
import { SelectProcess } from "@/components/ProcessService/SelectProcess";
import useToasts from "@/hooks/useToasts";

interface CreateOrderProps {
  id: string
}

export const CreateOrder: React.FC<CreateOrderProps> = ({ id }) => {
  const [clientObj, setClientObj] = useState<any>();
  const [processObj, setProcessObj] = useState<any>()
  const [description, setDescription] = useState<string>("");
  const [value, setValue] = useState<number>();
  const userId = id
  const status = "PENDENTE";
  const sector = "VENDAS";
  const {showToast, showToastOnReload} = useToasts()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const clientId = clientObj?.value;
    const processId = processObj?.value;
    try {
      const response = await registerOrder({
        clientId,
        status,
        userId,
        sector,
        description,
        value,
        processId
      });
      showToastOnReload("Ordem de serviço criada com sucesso", 'success')

      window.location.reload();
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        showToast(error.message, 'error')
      } else {
        showToast("Ocorreu um erro inesperado. Tente novamente", 'error')
      }
    }
  };

  return (
    <div>
      <CreateButton>
        <div className="modal-top mb-5">
          <h1 className="text-2xl text-center">Nova Ordem de Serviço</h1>
        </div>
        <form onSubmit={handleSubmit} className="modal-middle space-y-3 flex flex-col items-center">
          <div className="w-full max-w-md">
            <label className="block mb-2">Cliente</label>
            <SelectClient
              controlState={[clientObj, setClientObj]}
              dataKey={"id"}
            />
          </div>
          <div className="w-full max-w-md">
            <label className="block mb-2">Processo</label>
            <SelectProcess
              controlState={[processObj, setProcessObj]}
              dataKey={"id"}
            />
          </div>
          <div className="w-full max-w-md">
            <label className="block mb-2" htmlFor="description">Descrição</label>
            <textarea
              className="textarea textarea-bordered w-full min-h-[100px] max-h-[170px]"
              placeholder="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="w-full max-w-md">
            <label className="block mb-2">Preço</label>
            <div className="flex items-center gap-2">
              <label className="input input-bordered flex items-center gap-2 w-full">
                R$
                <input
                  type="number"
                  className="grow"
                  value={value ?? ""}
                  onChange={(e) => setValue(e.target.value ? parseFloat(e.target.value) : undefined)}
                />

              </label>
            </div>
          </div>
          <div className="w-full max-w-md flex justify-end">
            <button type="submit" className="btn btn-info mt-4">
              Registrar Ordem de Serviço
            </button>
          </div>
        </form>
      </CreateButton>
    </div>
  );
};
