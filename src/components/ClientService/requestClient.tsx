"use client";

interface RequestClientProps {
  name: string;
  email: string;
  phone: string;
  cnpj: string;
  address: string; // Campo que reúne informações de endereço
}

const RequestClient: React.FC<RequestClientProps> = ({ name, email, phone, cnpj, address }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <h2 className="text-xl font-semibold">{name}</h2>
      <p className="text-gray-700">Email: {email}</p>
      <p className="text-gray-700">Telefone: {phone}</p>
      <p className="text-gray-700">CNPJ: {cnpj}</p>
      <p className="text-gray-700">Endereço: {address}</p>
    </div>
  );
};

export default RequestClient;
