interface RequestVehicleProps {
    model: string;
    brand: string;
    plate: string;
    year: string;
    autonomy: string;
    status: string;
    id: string;
    onDelete: (id: string) => void; // Função de exclusão que será chamada ao clicar no botão de exclusão
  }
  
  const RequestVehicle: React.FC<RequestVehicleProps> = ({ model, brand, plate, year, autonomy, status, id, onDelete }) => {
    return (
      <div className="table w-full bg-white shadow-md rounded-lg mb-4">
        <div className="flex justify-between items-center p-4">
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold">{model}</h2>
            <p className="text-gray-700">Marca: {brand}</p>
            <p className="text-gray-700">Placa: {plate}</p>
            <p className="text-gray-700">Ano: {year}</p>
            <p className="text-gray-700">Autonomia: {autonomy} km</p>
            <p className="text-gray-700">Status: {status}</p>
          </div>
          <button
            onClick={() => onDelete(id)} // Chama a função de exclusão ao clicar no botão
            className="btn btn-danger text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none"
          >
            Excluir
          </button>
        </div>
      </div>
    );
  };
  
  export default RequestVehicle;
  