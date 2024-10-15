'use client'

import { ReadOrder } from "@/components/OrderService/readOrder";
import { CreateOrder } from "@/components/OrderService/createOrder";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "@/app/context/auth";

export default function OrderService() {
  const { user } = useContext(AuthContext)

  useEffect(()=>{
    console.log(user)
  })
  return (
      <div className="m-5 space-y-5">
        <div className="justify-between flex items-center">
            <h1 className="text-2xl">Lista de ordens de serviço:</h1>
            <CreateOrder 
            id={user?.id}/>
        </div>
        <ReadOrder
        userId={user?.id}/>
      </div>
  );
}
