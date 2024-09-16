import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState } from "react";
import Modal from "./modal";
import RadialProgress from "./radialProgress";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function TodoList() {
  const [animationParent] = useAutoAnimate();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [editeMode, setEditeMode] = useState<number | null>(null);
  const [editedText, setEditedText] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [todoToDelete, setTodoToDelete] = useState<number | null>(null);

  function addTodo() {
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
        completed: false
      };

      setTodos([...todos, newTodo]);
      setInputText("");
    }
  }

  function toggleComplete(id: number) {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  }

  function deleteTodo(id: number) {
    setTodoToDelete(id);
    setModalOpen(true);
  }

  function confirmDelete() {
    if (todoToDelete !== null) {
      const updatedTodos = todos.filter((todo) => todo.id !== todoToDelete);
      setTodos(updatedTodos);
      setModalOpen(false);
      setTodoToDelete(null);
    }
  }

  function editTodo(id: number) {
    setEditeMode(id);

    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setEditedText(todoToEdit.text);
    }
  }

  function saveEditedTodo() {
    if (editeMode !== null) {
      const updatedTodos = todos.map((todo) =>
        todo.id === editeMode ? { ...todo, text: editedText } : todo
      );

      setTodos(updatedTodos);
      setEditeMode(null);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      addTodo();
    }
  }

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;
  const completionPercentage = totalCount === 0 ? 0 : (completedCount / totalCount) * 100;

  return (
    <>
      <div className="rounded-md mx-auto space-y-5 w-full max-w-md bg-white shadow-lg transition-all hover:scale-105 p-4">
        <div className="grid place-items-center gap-4">
          <div className="flex w-full items-center">
            <div className="flex flex-grow items-center px-12">
              <h2 className="text-2xl font-bold">Setor</h2>
            </div>
            <div className="flex flex-grow items-center justify-center">
              <RadialProgress percentage={completionPercentage} />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row mb-4 gap-2">
            <input
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              value={inputText}
              type="text"
              placeholder="Adicionar Tarefa..."
              className="border-gray-300 border rounded-md px-8 py-2 flex-grow"
            />
            <button
              onClick={addTodo}
              className="bg-blue-500 text-white px-8 py-2 rounded-md"
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
                {editeMode === todo.id ? (
                  <>
                    <input
                      onChange={(e) => setEditedText(e.target.value)}
                      value={editedText}
                      type="text"
                      className="border-gray-300 border rounded-md px-4 py-2 flex-grow"
                    />
                    <button
                      onClick={saveEditedTodo}
                      className="bg-green-500 text-white px-4 py-2 rounded-md ml-2"
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
                      className="mr-3"
                    />
                    <span className={`flex-grow text-left ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                      {todo.text}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => editTodo(todo.id)}
                        className="text-yellow-500"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="text-red-500"
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
