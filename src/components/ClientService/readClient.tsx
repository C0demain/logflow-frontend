"use client";

import { useState, useCallback, useEffect } from "react";
import RequestClient from "./requestClient"; 
import Loading from "@/app/loading";
import { listUsers } from "@/app/api/clientService/listClient"; 

interface UserData {
    name: string;
    email: string;
    phone: string;
    cnpj: string;
    zipCode: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    number: string;
    complement?: string;
    id: string; // ID do cliente
}

export function ReadClients() {
    const [data, setData] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);

    const getUsers = useCallback(async () => {
        try {
            const response = await listUsers(); // Chamada para listar os clientes
            setData(response);
        } catch (error) {
            console.error("Error fetching clients:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="flex flex-col space-y-10 justify-center">
            {data.map((client) => (
                <RequestClient
                    key={client.id}
                    name={client.name}
                    email={client.email}
                    phone={client.phone}
                    cnpj={client.cnpj}
                    address={`${client.street}, ${client.number}, ${client.neighborhood}, ${client.city} - ${client.state}`}
                />
            ))}
        </div>
    );
}
