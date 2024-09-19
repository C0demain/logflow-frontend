import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState } from "react";
import Modal from "./modal"; 
import RadialProgress from "./radialProgress";
import { FaEdit, FaTrash } from 'react-icons/fa'; 

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

interface TodoListProps {
  sectorName: string;
}

export default function TodoList({ sectorName }: TodoListProps) {
  const [animationParent] = useAutoAnimate();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [editedText, setEditedText] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [todoToEdit, setTodoToEdit] = useState<number | null>(null);
  const [modalOpenDelete, setModalOpenDelete] = useState<boolean>(false);
  const [todoToDelete, setTodoToDelete] = useState<number | null>(null);

  const addTodo = () => {
    if (inputText.trim() !== "") {
      const isExistingTodo = todos.some((todo) => todo.text === inputText);

      if (isExistingTodo) {
        alert("Essa tarefa já existe!");
        setInputText("");
        return;
      }

      const newTodo: Todo = {
        id: todos.length + 1,
        text: inputText,
        completed: false,
      };

      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setInputText("");
    }
  };

  const toggleComplete = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (id: number) => {
    setTodoToDelete(id);
    setModalOpenDelete(true);
  };

  const confirmDelete = () => {
    if (todoToDelete !== null) {
      const updatedTodos = todos.filter((todo) => todo.id !== todoToDelete);
      setTodos(updatedTodos);
      setModalOpenDelete(false);
      setTodoToDelete(null);
    }
  };

  const editTodo = (id: number) => {
    setTodoToEdit(id);
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setEditedText(todoToEdit.text);
      setModalOpen(true); // Abre o modal de edição
    }
  };

  const saveEditedTodo = () => {
    if (todoToEdit !== null) {
      const updatedTodos = todos.map((todo) =>
        todo.id === todoToEdit ? { ...todo, text: editedText } : todo
      );
      setTodos(updatedTodos);
      setModalOpen(false);
      setTodoToEdit(null);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addTodo();
    }
  };

  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;
  const completionPercentage = totalCount === 0 ? 0 : (completedCount / totalCount) * 100;

  return (
    <>
      <div className="rounded-md mx-auto space-y-5 w-full max-w-md bg-white shadow-lg transition-all p-4">
        <div className="grid place-items-center gap-4">
          <div className="flex w-full items-center">
            <div className="flex flex-grow items-center">
              <h2 className="text-2xl font-bold mx-3">{sectorName}</h2>
            </div>
            <div className="justify-right">
              <RadialProgress percentage={completionPercentage} />
            </div>
          </div>
          <div className="flex w-full px-2 flex-col sm:flex-row mb-4 gap-2 justify-items-stretch">
            <input
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              value={inputText}
              type="text"
              placeholder="Adicionar Tarefa..."
              className="input input-bordered flex-grow"
            />
            <button
              onClick={addTodo}
              className="btn btn-primary ml-2"
            >
              Adicionar
            </button>
          </div>
          <ul ref={animationParent} className="w-full">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex justify-between border-b py-2 px-4 items-center"
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                  className="mr-3 h-6 w-6"
                />
                <span className={`flex-grow text-left ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                  {todo.text}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => editTodo(todo.id)}
                    className="text-yellow-500"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-red-500"
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal de Edição */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={saveEditedTodo}
      >
        <h2 className="text-lg font-bold mb-4">Editar Tarefa</h2>
        <input
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          className="input input-bordered w-full mb-4"
          placeholder="Digite a nova tarefa"
        />
      </Modal>

      <Modal
        isOpen={modalOpenDelete}
        onClose={() => setModalOpenDelete(false)}
        onConfirm={confirmDelete}
      >
        <h2 className="text-lg font-bold mb-4">Tem certeza que deseja deletar esta tarefa?</h2>
      </Modal>

    </>
  );
}
