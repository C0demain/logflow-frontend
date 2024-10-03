import { listClient } from "@/app/api/clientService/listClient";
import { useState, useEffect } from "react";
import Select from "react-select";

type ClientOption = {
    value: string;
    label: string;
};

type PropsType = {
    controlState: [ClientOption | null, (value: ClientOption | null) => void]; 
    dataKey: string;
    className?: string;
};

export const SelectClient = (props: PropsType) => {
    const [clientOpt, setClientOpt] = useState<ClientOption[]>([]);
    const [isClient, setIsClient] = useState(false);
    const [controlState, setControlState] = props.controlState;

    const getClients = async () => {
        const response = await listClient('', '', '', '');
        const options = response.clients.map((c: { id: string; name: string; }) => ({
            value: c.id,
            label: c.name,
        }));

        setClientOpt(options);
    };

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient) {
            getClients(); 
        }
    }, [isClient]);

    if (!isClient) {
        return null;
    }

    return (
        <Select
            options={clientOpt}
            value={controlState}
            onChange={setControlState} 
            className={`text-black ${props.className || ''}`} 
            classNamePrefix="custom-select"
            placeholder="Select an option"
            isClearable 
        />
    );
};
