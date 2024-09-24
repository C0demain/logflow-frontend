"use client";

import TodoList from "@/components/todoList";

export default function RequestList() {
  return (
    <div className="m-5 space-y-5">
      <h1 className="text-2xl font-bold">Lista de Tarefas:</h1>
      <div className="flex flex-col space-y-5 sm:flex-row sm:space-y-0 sm:space-x-5">
        <div className="flex-1">
          <TodoList sectorName={"Comercial"} />
        </div>
        <div className="flex-1">
          <TodoList sectorName={"Operacional"} />
        </div>
        <div className="flex-1">
          <TodoList sectorName={"Financeiro"} />
        </div>
      </div>
    </div>
  );
}
