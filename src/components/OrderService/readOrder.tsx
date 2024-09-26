'use client'
import { useState, useCallback, useEffect } from "react";
import { RequestItem } from "./requestItem";
import Loading from "@/app/loading";
import { listOs } from "@/app/api/orderService/listOS";

interface OrderData {
    title: string;
    clientRelated: string;
    status: string;
    userId: string;
    sector: string;
    id: string;
  }  

export function ReadOrder(){
    const [data, setData] = useState<OrderData[]>([]);
    const [loading, setLoading] = useState(true);

    const getOs = useCallback(async () => {
        try {
        const response = await listOs();
        setData(response);
        } catch (error) {
        console.error("Error fetching orders:", error);
        } finally {
        setLoading(false);
        }
    }, []);

    useEffect(() => {
        getOs();
    }, [getOs]);

    if (loading) {
        return <Loading />;
    }


    return(
        <div className="flex flex-col space-y-10 justify-center">
            {data.map((order) => (
            <RequestItem
                key={order.id}
                status={order.status}
                id={order.id}
                name={order.title}
                sector={order.sector}
            />
            ))}
        </div>
    )
}