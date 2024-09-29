export default interface ClientData {
  id: string;
  name: string;
  email: string;
  phone: string;
  cnpj: string;
  address: {
    zipCode: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    number: string;
    complement?: string;
  };
}
