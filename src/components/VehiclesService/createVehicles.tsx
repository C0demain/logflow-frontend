'use client'

import { useState } from "react";
import { registerVehicle } from "@/app/api/vehicleService/registerVehicle"; // Certifique-se de ter a função de API correspondente
import axios from "axios";

import CreateButton from "../Shared/createButton";
import useToasts from "@/hooks/useToasts";

interface VehicleData {
  model: string;
  brand: string;
  plate: string;
  year: number;         // Alterado para number
  autonomy: number;     // Alterado para number
  status: string;
}

export function CreateVehicle() {
  const [formData, setFormData] = useState<VehicleData>({
    model: "",
    brand: "",
    plate: "",
    year: 0,   // Definido com um valor numérico default
    autonomy: 0,  // Definido com valor numérico default
    status: "Disponível", // Valor padrão para status
  });

  const [loading, setLoading] = useState(false);
  const {showToast, showToastOnReload} = useToasts()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Se o campo for "year" ou "autonomy", converta para number
    if (name === "year" || name === "autonomy") {
      setFormData({ ...formData, [name]: value ? Number(value) : 0 });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await registerVehicle(formData); // Certifique-se de que essa função está implementada corretamente
      setFormData({
        model: "",
        brand: "",
        plate: "",
        year: 2024, // Resetando para o valor default
        autonomy: 0, // Resetando para o valor default
        status: "Disponível", // Resetando status
      });
      showToastOnReload("Veículo cadastrado com sucesso", 'success')
      window.location.reload();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        showToast(error.message, 'error')
      } else {
        showToast("Ocorreu um erro inesperado. Tente novamente", 'error')
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <CreateButton>
        <h1 className="text-2xl font-semibold mb-4">Cadastrar Veículo</h1>
        <form onSubmit={handleSubmit} className="modal-middle space-y-3">
          <input
            type="text"
            name="model"
            placeholder="Modelo"
            value={formData.model}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="brand"
            placeholder="Marca"
            value={formData.brand}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="plate"
            placeholder="Placa"
            value={formData.plate}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="number"
            name="year"
            placeholder="Ano"
            value={formData.year}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="number"
            name="autonomy"
            placeholder="Autonomia (km)"
            value={formData.autonomy}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="Disponível">Disponível</option>
            <option value="Em uso">Em uso</option>
          </select>

          <div className="modal-action flex justify-around">
            <button type="submit" className="btn btn-info hover:text-white">
              Registrar Veículo
            </button>
          </div>
        </form>
      </CreateButton>
    </div>
  );
}
