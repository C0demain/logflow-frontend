"use client"

import { RequestItem } from "@/components/requestItem"

export default function RequestList(){
    return (
        <div className="m-5 space-y-5">
            <h1 className="text-2xl">Lista de pedidos:</h1>
            <RequestItem
            name={"pedido 1"}
            stage1={true}
            stage2={true}
            stage3={true}/>
        </div>
    )
}