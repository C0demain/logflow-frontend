interface RequestUserProps {
  name: string;
  email: string;
  role: string;
  sector: string;
  id: string;
  onDelete: (id: string) => void;
}

const RequestUser: React.FC<RequestUserProps> = ({ name, email, role, sector }) => {
  return (
    <div className="table">
      <div>
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-gray-700">Email: {email}</p>
        <p className="text-gray-700">Cargo: {role}</p>
        <p className="text-gray-700">Setor: {sector}</p>
      </div>
    </div>
  );
};

export default RequestUser;
