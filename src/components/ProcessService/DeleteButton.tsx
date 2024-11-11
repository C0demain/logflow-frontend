export default function DeleteProcess() {
    return (
        <div>
            <div>
                <label htmlFor="delete8fa8a463-b3fe-4d62-88a8-2361ce0ebb87" className="btn btn-md  bg-gray-100 flex items-center hover:bg-red-500 hover:text-white hover:shadow-md">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path>
                    </svg>
                </label>
                <input id="delete8fa8a463-b3fe-4d62-88a8-2361ce0ebb87" className="modal-toggle" type="checkbox" />
            </div>
            <div className="modal" role="dialog">
                <div className="modal-box">
                    <h1 className="modal-top text-2xl">Deseja realmente excluir esse processo?</h1>
                    <div className="modal-action justify-center">
                        <label htmlFor="delete8fa8a463-b3fe-4d62-88a8-2361ce0ebb87" className="btn btn-error hover:text-white">Excluir</label>
                    </div>
                </div>
            </div>
        </div>
    )
}