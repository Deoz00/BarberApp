"use client";
import React, { useState } from "react";
import { useDate } from "@/context/DateContext";
import ModalDate from "@/components/dateForm/ModalDate";
import NewTable2 from "@/components/NewTable2";


export default function AgendarPage() {
  const { data, handleDelete } = useDate();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const del = async (id: string) => {
    
    await handleDelete(Number(id) );
  }

  const edit = async (data: any) => {
    setSelectedId(data.id); // Guardar el ID seleccionado
  }
  const addFunction = async () => {
    setSelectedId(-1);

  }

  return (
    <main className="container mx-auto flex flex-1 flex-col items-center justify-center overflow-hidden px-8 ">
      <section className="z-20 flex flex-col items-center justify-center gap-[18px] sm:gap-6  w-full   rounded-lg">
        {<NewTable2 users={data} eliminar={del} edit={edit} addFunction={addFunction} />}


       {selectedId  && <ModalDate tipo={selectedId} setSelectedId={setSelectedId} />}
      </section>
    </main>
  );
}
