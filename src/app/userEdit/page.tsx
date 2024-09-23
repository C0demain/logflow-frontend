'use client';

import { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Modal from '@/components/modal';

interface Employee {
    id: number;
    name: string;
    role: string;
}

export default function UserEdit() {
    const [employees, setEmployees] = useState<Employee[]>([
        { id: 1, name: 'João Silva', role: 'Desenvolvedor' },
        { id: 2, name: 'Maria Souza', role: 'Designer' },
        { id: 3, name: 'Carlos Pereira', role: 'Gerente de Projetos' },
    ]);

    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
    const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
    const [newName, setNewName] = useState('');
    const [newRole, setNewRole] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

    const openEditModal = (employee: Employee) => {
        setEditingEmployee(employee);
        setNewName(employee.name);
        setNewRole(employee.role);
        setIsModalOpen(true);
    };

    const closeEditModal = () => {
        setEditingEmployee(null);
        setNewName('');
        setNewRole('');
        setIsModalOpen(false);
    };

    const handleSave = () => {
        if (editingEmployee) {
            setEmployees(employees.map(emp =>
                emp.id === editingEmployee.id ? { ...emp, name: newName, role: newRole } : emp
            ));
        }
        closeEditModal();
    };

    const openDeleteConfirm = (employee: Employee) => {
        setEmployeeToDelete(employee);
        setIsDeleteConfirmOpen(true);
    };

    const closeDeleteConfirm = () => {
        setEmployeeToDelete(null);
        setIsDeleteConfirmOpen(false);
    };

    const confirmDelete = () => {
        if (employeeToDelete) {
            setEmployees(employees.filter(emp => emp.id !== employeeToDelete.id));
        }
        closeDeleteConfirm();
    };

    const openAddModal = () => {
        setNewName('');
        setNewRole('');
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setNewName('');
        setNewRole('');
        setIsAddModalOpen(false);
    };

    const handleAdd = () => {
        const newEmployee: Employee = {
            id: employees.length + 1,
            name: newName,
            role: newRole,
        };
        setEmployees([...employees, newEmployee]);
        closeAddModal();
    };

    return (
        <div className="flex flex-col rounded h-full bg-slate-50 ml-auto mr-auto items-center mt-10 space-y-5 w-3/4">
            <button
                onClick={openAddModal}
                className="ml-auto mt-6 mr-6 mb-6 border bg-blue-500 px-4 py-2 rounded text-sm"
            >
                Adicionar Funcionário
            </button>

            {employees.map(employee => (
                <div key={employee.id} className="flex flex-row h-9 w-full bg-white rounded-lg">
                    <div className="flex flex-row items-center w-3/4">
                        <div className='flex flex-row w-1/2'>
                            <h1 className='ml-4 font-bold'>Nome:</h1>
                            <h1 className="ml-4 ">{employee.name}</h1>
                        </div>    
                        <div className='flex flex-row'>
                            <h1 className='font-bold'>Função:</h1>
                            <h1 className='ml-4'>{employee.role}</h1>
                        </div>    
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => openEditModal(employee)}
                            className="text-black" 
                        >
                            <FaEdit className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => openDeleteConfirm(employee)}
                            className="text-black" 
                        >
                            <FaTrash className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            ))}

            {isAddModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Adicionar Novo Funcionário</h2>
                        <input 
                            className="w-full border border-gray-300 rounded px-2 mb-4"
                            placeholder="Nome"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                        />
                        <input 
                            className="w-full border border-gray-300 rounded px-2 mb-4"
                            placeholder="Função"
                            value={newRole}
                            onChange={(e) => setNewRole(e.target.value)}
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={closeAddModal}
                                className="border border-gray-500 text-gray-500 px-2 py-1 rounded text-sm"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleAdd}
                                className="border  border-gray-500 text-gray-500 px-2 py-1 rounded text-sm"
                            >
                                Adicionar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Editar Funcionário</h2>
                        <input 
                            className="w-full border border-gray-300 rounded px-2 mb-4"
                            placeholder="Nome"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                        />
                        <input 
                            className="w-full border border-gray-300 rounded px-2 mb-4"
                            placeholder="Função"
                            value={newRole}
                            onChange={(e) => setNewRole(e.target.value)}
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={closeEditModal}
                                className="border border-gray-500 text-gray-500 px-2 py-1 rounded text-sm"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSave}
                                className="border  border-gray-500 text-gray-500 px-2 py-1 rounded text-sm"
                            >
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            )}

{isDeleteConfirmOpen && (
    <Modal
        isOpen={isDeleteConfirmOpen}
        onClose={closeDeleteConfirm}
        onConfirm={confirmDelete}
    >
        <p>Você tem certeza que deseja excluir <strong>{employeeToDelete?.name}</strong>?</p>
    </Modal>
)}

        </div>
    );
}
