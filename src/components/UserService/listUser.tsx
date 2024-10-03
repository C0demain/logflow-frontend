import { useState, useCallback, useEffect } from "react";
import RequestUser from "./requestUser";
import Loading from "@/app/loading";
import { listUsers } from "@/app/api/userService/listUser";

interface UserData {
    id: string;
    name: string;
    email: string;
    role: string;
    sector: string;
}

export function ReadUsers() {
    const [data, setData] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);

    const getUsers = useCallback(async () => {
        try {
            const response = await listUsers();
            setData(response);
        } catch (error) {
            console.error("Error fetching employees:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const handleDelete = (id: string) => {
        setData(prevData => prevData.filter(user => user.id !== id));
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="flex flex-col space-y-10 justify-center">
            {data.map((user) => (
                <RequestUser
                    key={user.id}
                    id={user.id}
                    name={user.name}
                    email={user.email}
                    role={user.role}
                    sector={user.sector}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    );
}
