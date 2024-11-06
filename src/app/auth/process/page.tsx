"use client";

import { ProcessesList } from "@/components/ProcessService/ProcessList";

export default function ProcessListPage() {

  return (
    <div className="m-5">
        <h1 className="text-5xl mb-16">Processos</h1>
        <ProcessesList/>
    </div>
  );
}
