export default interface ClientUpdateInterface {
  id?: string;
  name: string;
  phone: string;
  cnpj: string;
  email: string;
  zipCode: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
  complement?: string;
}
