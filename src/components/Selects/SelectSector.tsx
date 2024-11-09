
type propsType = {
    controlState: any[],
    className?: string
}

const SelectSector = (props: propsType) => {
    const options = [
        { value: "OPERACIONAL", label: "Operacional" },
        { value: "FINANCEIRO", label: "Financeiro" },
        { value: "RH", label: "RH" },
        { value: "DIRETORIA", label: "Diretoria" },
        { value: "VENDAS", label: "Vendas" },
    ];
    const [controlState, setControlState] = props.controlState

    return (
        <select
            value={controlState}
            onChange={(e) => { setControlState(e.target.value); }}
            className="select select-bordered w-full"
            name="sector"
            key="sector"
        >
            {options.map(op => <option value={op.value} key={op.value}>{op.label}</option>)}
        </select>
    )
}

export default SelectSector