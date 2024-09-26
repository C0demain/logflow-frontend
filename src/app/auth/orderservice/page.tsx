import { ReadOrder } from "@/components/OrderService/readOrder";
import { CreateOrder } from "@/components/OrderService/createOrder";

export default function OrderService() {

  return (
      <div className="m-5 space-y-5">
        <div className="justify-between flex items-center">
            <h1 className="text-2xl">Lista de ordens de serviço:</h1>
            <CreateOrder />
        </div>
        <ReadOrder/>
      </div>
  );
}
