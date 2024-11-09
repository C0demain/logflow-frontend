
type propsType = {
    controlState: any[],
    className?: string
}

const SelectStage = (props: propsType) => {
    const options = [
        { value: 'VENDA REALIZADA', label: 'VENDA REALIZADA' },
        { value: 'EMISSÃO DE DOCUMENTOS DE COLETA', label: 'EMISSÃO DE DOCUMENTOS DE COLETA' },
        { value: 'COLETA', label: 'COLETA' },
        { value: 'EMISSÃO DE DOCUMENTOS DE ENTREGA', label: 'EMISSÃO DE DOCUMENTOS DE ENTREGA' },
        { value: 'ENTREGA', label: 'ENTREGA' },
        { value: 'CONFIRMAÇÃO DE ENTREGA', label: 'CONFIRMAÇÃO DE ENTREGA' },
        { value: 'CONFERÊNCIA DE ORÇAMENTO', label: 'CONFERÊNCIA DE ORÇAMENTO' }
    ];
    const [controlState, setControlState] = props.controlState

    return (
        <select
            value={controlState}
            onChange={(e) => { setControlState(e.target.value); }}
            className="select select-bordered w-full"
            name="stage"
            key="stage"
        >
            {options.map(op => <option value={op.value} key={op.value}>{op.label}</option>)}
        </select>
    )
}

export default SelectStage