import { useState } from "react";
import useToasts from "@/hooks/useToasts";
import CreateButton from "../Shared/createButton";
import { registerEvent } from "@/app/api/calendarService/registerEvent";

export default function CreateEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start: "",
    end: "",
    allDay: false,
  });
  const [loading, setLoading] = useState(false);
  const { showToast } = useToasts();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Validação simples
    if (!formData.title || !formData.start || !formData.end) {
      showToast("Preencha todos os campos obrigatórios", "error");
      setLoading(false);
      return;
    }

    try {
      const response = await registerEvent(formData);
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
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
              Início <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-2">
              <input
                type="date"
                id="start"
                name="startDate"
                onChange={(e) =>
                  setFormData({ ...formData, start: e.target.value })
                }
                className="input input-bordered w-1/2"
              />
              <input
                type="time"
                id="start-time"
                name="startTime"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    start: `${formData.start.split("T")[0]}T${e.target.value}`,
                  })
                }
                className="input input-bordered w-1/2"
              />
            </div>
          </div>
          <div className="w-full max-w-md">
            <label className="block mb-2" htmlFor="end">
              Fim <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-2">
              <input
                type="date"
                id="end"
                name="endDate"
                onChange={(e) =>
                  setFormData({ ...formData, end: e.target.value })
                }
                className="input input-bordered w-1/2"
              />
              <input
                type="time"
                id="end-time"
                name="endTime"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    end: `${formData.end.split("T")[0]}T${e.target.value}`,
                  })
                }
                className="input input-bordered w-1/2"
              />
            </div>
          </div>
          <div className="modal-action flex justify-around">
            <button
              type="submit"
              className={`btn btn-info hover:text-white ${
                loading ? "loading" : ""
              }`}
              disabled={loading}
            >
              Registrar evento
            </button>
          </div>
        </form>
      </div>
    </CreateButton>
  );
}
