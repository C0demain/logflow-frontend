import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-5 w-11/12 max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">
          X
        </button>
        {children}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600 transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
