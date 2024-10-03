'use client'

import { ReadOrder } from "@/components/OrderService/readOrder";
import { CreateOrder } from "@/components/OrderService/createOrder";
import { useEffect, useState } from "react";
import axios from "axios";

export default function OrderService() {
  const [userId, setUserId] = useState('')

  const getId = async () => {
    try {
      const response = await axios.get('/api/getId');
      setUserId(response.data.id)
    } catch (error) {
      console.error('ID não encontrada')
    }
  }

  useEffect(() => {
    getId();
  }, []);


  return (
    <div className="m-5 space-y-5">
      <div className="justify-between flex items-center">
        <h1 className="text-2xl">Lista de ordens de serviço:</h1>
        <CreateOrder
          id={userId}
        />
      </div>
        <ReadOrder
          userId={userId} 
        />
    </div>
  );
}
