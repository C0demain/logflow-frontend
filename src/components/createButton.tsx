import { FaPlus } from "react-icons/fa";

export default function CreateButton({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleModalOpen = () => {
    const modal = document.getElementById("modal");
    if (modal) {
      (modal as HTMLDialogElement).showModal();
    } else {
      console.error("Modal element not found");
    }
  };

  return (
    <>
      <button
        className="btn btn-info btn-lg btn-circle absolute bottom-10 right-10"
        onClick={handleModalOpen}
      >
        <FaPlus />
      </button>

      <dialog className="modal" id="modal">
        <div className="modal-box">{children}</div>
        <form className="modal-backdrop" method="dialog">
          <button>Fechar</button>
        </form>
      </dialog>
    </>
  );
}
