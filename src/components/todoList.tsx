import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState } from "react";
import Modal from "./modal";
import RadialProgress from "./radialProgress";

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
  const [editMode, setEditMode] = useState<number | null>(null);
  const [editedText, setEditedText] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
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
    setModalOpen(true);
  };

  const confirmDelete = () => {
    if (todoToDelete !== null) {
      const updatedTodos = todos.filter((todo) => todo.id !== todoToDelete);
      setTodos(updatedTodos);
      setModalOpen(false);
      setTodoToDelete(null);
    }
  };

  const editTodo = (id: number) => {
    setEditMode(id);
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setEditedText(todoToEdit.text);
    }
  };

  const saveEditedTodo = () => {
    if (editMode !== null) {
      const updatedTodos = todos.map((todo) =>
        todo.id === editMode ? { ...todo, text: editedText } : todo
      );
      setTodos(updatedTodos);
      setEditMode(null);
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
      <div className="rounded-md mx-auto space-y-5 w-full max-w-md bg-white shadow-lg transition-all hover:scale-105 p-4">
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
                {editMode === todo.id ? (
                  <>
                    <input
                      onChange={(e) => setEditedText(e.target.value)}
                      value={editedText}
                      type="text"
                      className="input input-bordered flex-grow"
                    />
                    <button
                      onClick={saveEditedTodo}
                      className="btn btn-success ml-2"
                    >
                      Salvar
                    </button>
                  </>
                ) : (
                  <>
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
                        className="border border-yellow-500 text-yellow-500 px-2 py-1 rounded text-sm"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="border border-red-500 text-red-500 px-2 py-1 rounded text-sm"
                      >
                        Deletar
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
}
