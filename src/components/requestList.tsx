"use client";

import TodoList from "@/components/todoList";

export default function RequestList() {
  return (
    <div className="m-5 space-y-5">
      <h1 className="text-2xl">Lista de Tarefas:</h1>
      <div className="flex w-full flex-col space-y-5">
        <TodoList sectorName="Comercial" />
        <TodoList sectorName="Operacional" />
        <TodoList sectorName="Financeiro" />
      </div>
    </div>
  );
}
