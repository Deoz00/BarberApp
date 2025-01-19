"use client";
import React, { useState, useEffect } from "react";
import NewTable from "@/components/NewTable";
import NewTable2 from "@/components/NewTable2";

//import { useDate } from "@/context/DateContext";
import ModalDate from "@/components/dateForm/ModalDate";
import { getUsuarios } from "@/services/usuariosService";
import ModalEditUser from "@/components/ModalEditUser";
import { edit as editUs, deleteUser, AdminCreateUser } from "@/services/usuariosService";
import { useRouter } from "next/navigation";
import { useAuth } from '@/context/AuthContext';



interface User {
    id: string;
    name: string;
    userName: string;
    role: string;
  }

export default function AdminPage() {


  const user = useAuth(); // Obtén los datos del usuario, incluyendo el rol
  const router = useRouter();

useEffect(() => {

  if (user.user?.role !== "Admin"){
    router.push("/"); // Redirige si no es admin
  }
}, [router]);



 // const { data, handleDelete } = useDate();
  const [selectedUser, setSelectedUser] = useState<User | null | number>(null);
  const [users, setUsers] = useState<User[]>([]);


  const del = async (id: string) => {
    
    await deleteUser(id);
    fetch();
  }

  const edit = async (id: User) => {
    setSelectedUser(id);
  }
  const addFunction = async () => {
    setSelectedUser(-1);

  }


  const fetch = async () => {
    const data = await getUsuarios();

    setUsers(data.result);
  };


  useEffect(() => {
    fetch();
   
  }, []);



  return (
    <main className="container mx-auto flex flex-1 flex-col items-center justify-center overflow-hidden px-8 ">
      <section className="z-20 flex flex-col items-center justify-center gap-[18px] sm:gap-6  w-full   rounded-lg">
        
        { <NewTable2 users={users} eliminar={del} edit={edit} addFunction={addFunction} />}


       {selectedUser && <ModalEditUser   reLoad={fetch}  tipo={selectedUser} setSelectedId={setSelectedUser}/>}
      </section>
    </main>
  );
}
