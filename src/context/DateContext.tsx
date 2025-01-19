"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface Data {
  id: number;

  cliente: string;
  empleado: string;
  fechaCita: string;
  estado: string;
  comentarios: string | null;
}

import { getCitas, deleteCita,editCita, createCita} from "@/services/citasService";
import { getUsuarioRol } from "@/services/usuariosService";

import { useAuth } from '@/context/AuthContext';

type User = {
  name: string;
  id: string;
  citasEmpleado: string[];
};

interface DateContextType {
  data: Data[]; // Array de datos
  myData: () => Promise<void>; // Función para obtener los datos
  handleDelete: (id:number) => Promise<void>; // Función para obtener los datos
  handleEdit: (id:number, data:any) => Promise<void>; // Función para obtener los datos
  create: (data:any) => Promise<void>; // Función para obtener los datos
  getUserByRol: (role:string) => Promise<User[]>; // Función para obtener los datos
  
}

const DateContext = createContext<DateContextType | undefined>(undefined);

export const DateProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState<Data[]>([]);
  const { user } = useAuth();


  const handleDelete = async (id: number) => {
    try {

      deleteCita(id);

      setData((prevData) => {
    
        // Filtrar las citas
        const nuevasCitas = prevData.filter((item) => item.id !== id);
    
        return nuevasCitas; // Actualiza el estado con el nuevo arreglo
      });



     


    } catch (error) {
    }
  }
  const handleEdit = async (id: number, data:any) => {
    try {

      await editCita(id, data);
      await myData();


     
    } catch (error) {
    }
  }

  const create = async (data: any) => {
    
    try {

      await  createCita(data);
      await myData();

      
    } catch (error) {
    }
  }
  const getUserByRol = async (role: string) => {
    
    try {

      const data = await getUsuarioRol(role);
      return data.result;
 
    } catch (error) {
    }
    return [];
  }

 
  const myData = async () => {
    try {
      const result = await getCitas();

      setData(result.result);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    myData();
  }, []);




  if (loading) {
    return <div>Cargando...</div>; // Puedes personalizar esto con un spinner o similar
  }

  return (
    <DateContext.Provider value={{ data, myData, handleDelete,handleEdit, create,getUserByRol}}>
      {children}
    </DateContext.Provider>
  );
};

// Hook para usar el contexto
export const useDate = () => {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error("useDate must be used within a DateProvider");
  }
  return context;
};
