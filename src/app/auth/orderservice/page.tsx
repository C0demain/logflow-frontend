'use client'

import { ReadOrder } from "@/components/OrderService/readOrder";
import { CreateOrder } from "@/components/OrderService/createOrder";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "@/app/context/auth";

export default function OrderService() {
  const [userId, setUserId] = useState<string | undefined>('')
  const { user } = useContext(AuthContext)

  useEffect(()=>{
    setUserId(user?.id)
  },[])
  return (
      <div className="m-5 space-y-5">
        <div className="justify-between flex items-center">
            <h1 className="text-2xl">Lista de ordens de serviço:</h1>
            <CreateOrder 
            id={userId}/>
        </div>
        <ReadOrder
        userId={userId}/>
      </div>
  );
}
