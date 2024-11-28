import { registerEvent } from "@/app/api/calendarService/registerEvent";
import useToasts from "@/hooks/useToasts";
import UserCookie from "@/interfaces/userCookie";
import axios from "axios";
import { useState } from "react";
import CreateButton from "../Shared/createButton";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");

export default function CreateEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start: "",
    end: "",
  });
  const [loading, setLoading] = useState(false);
  const { showToast } = useToasts();

  async function fetchUserCookie(): Promise<UserCookie | undefined> {
    try {
      const response = await axios.get("/api/getUser");
      return response.data as UserCookie;
    } catch (error) {
      console.error("Failed to fetch token", error);
      return undefined;
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.title || !formData.start || !formData.end) {
      showToast("Preencha todos os campos obrigatórios", "error");
      setLoading(false);
      return;
    }

    try {
      const userId = (await fetchUserCookie())?.id;
      if (!userId) {
        showToast("Erro ao obter o ID do usuário", "error");
        setLoading(false);
        return;
      }

      if (!dayjs(formData.start).isBefore(dayjs(formData.end))) {
        showToast(
          "Data de início não pode ser após a data de término",
          "error"
        );
        setLoading(false);
        return;
      }

      const response = await registerEvent({
        ...formData,
        start: dayjs(formData.start).toISOString(),
        end: dayjs(formData.end).toISOString(),
        userId,
      });

      if (response) {
        showToast("Evento cadastrado com sucesso", "success");
      }
    } catch (error) {
      console.error("Failed to create event", error);
      showToast("Erro ao cadastrar evento", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <CreateButton>
      <div>
        <h1 className="text-2xl text-center">Adicionar novo evento</h1>
        <form
          onSubmit={handleSubmit}
          className="modal-middle space-y-3 flex flex-col items-center"
        >
          <div className="w-full max-w-md">
            <label htmlFor="title" className="block mb-2">
              Título <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Título"
              value={formData.title}
              onChange={handleChange}
              className="input input-bordered rounded-md w-full"
            />
          </div>
          <div className="w-full max-w-md">
            <label className="block mb-2" htmlFor="description">
              Descrição
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="textarea textarea-bordered w-full min-h-[100px] max-h-[170px]"
              placeholder="Descrição"
            />
          </div>
          <div className="w-full max-w-md">
            <label className="block mb-2" htmlFor="start">
              Data e Hora de Início <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              id="start"
              name="start"
              value={formData.start}
              min={dayjs().toISOString()}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
          <div className="w-full max-w-md">
            <label className="block mb-2" htmlFor="end">
              Data e Hora de Término <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              id="end"
              name="end"
              min={dayjs().toISOString()}
              value={formData.end}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
          <div className="modal-action flex justify-around">
            <button
              type="submit"
              className={`btn btn-info hover:text-white ${
                loading ? "loading" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Registrando..." : "Registrar evento"}
            </button>
          </div>
        </form>
      </div>
    </CreateButton>
  );
}
