"use client";

import { useState } from "react";
import { SelectClient } from "../ClientService/selectClient";
import { registerOrder } from "@/app/api/orderService/registerOrder";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import { isAxiosError } from "axios";
import CreateButton from "../Shared/createButton";

interface CreateOrderProps {
  id: string | undefined;
}

export const CreateOrder: React.FC<CreateOrderProps> = ({ id }) => {
  const [title, setTitle] = useState<string>("");
  const [clientObj, setClientObj] = useState<any>();
  const [description, setDescription] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const userId = id;
  const status = "PENDENTE";
  const sector = "VENDAS";
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const clientId = clientObj?.value;
    const parsedValue = parseFloat(value) || 0;

    try {
      const response = await registerOrder({
        title,
        clientId,
        status,
        userId,
        sector,
        description,
        value: parsedValue
      });
      toast({
        status: "success",
        title: "Sucesso",
        description: "Ordem de serviço criada com sucesso",
      });

      setTitle("");
      setClientObj(null);
      setDescription("");
      setValue("");
      router.refresh();
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        toast({
          status: "error",
          title: "Erro",
          description: error.message,
        });
      } else {
        toast({
          status: "error",
          title: "Erro",
          description: "Ocorreu um erro inesperado. Tente novamente",
        });
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
            <label htmlFor="title" className="block mb-2">
              Titulo
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered rounded-md w-full"
            />
          </div>
          <div className="w-full max-w-md">
            <label className="block mb-2">Cliente</label>
            <SelectClient
              controlState={[clientObj, setClientObj]}
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
                  value={value}
                  onChange={(e) => setValue((e.target.value))}
                /></label>
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
