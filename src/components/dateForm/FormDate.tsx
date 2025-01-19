"use client";
import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "@nextui-org/react";
import DatePickerC from "./DatePickerC";
import DateHoursSelect from "./DateHoursSelect";
import { Select, SelectItem } from "@nextui-org/react";
import { useAuth } from "@/context/AuthContext";
import { useDate } from "@/context/DateContext";
import {CircularProgress} from "@nextui-org/react";


export interface User {
  id: string;
  name: string;
  citasEmpleado: string[]; // Asegúrate de que esta propiedad esté definida correctamente
}

interface FormDateProps {
  onClose: () => void;
  tipo: number;
}

export default function FormDate({ onClose, tipo }: FormDateProps) {

  const { user } = useAuth();
  const { getUserByRol } = useDate();
  const { create,handleEdit } = useDate();

  const [users, setUsers] = useState<User[]>([]);
  const [horas, setHoras] = useState<string[]>([]);

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const [isLoading, setIsLoading] = useState(false);



  // Hook para obtener el token y hacer el fetch al cargar el componente
  useEffect( () => {

    const fetch = async () =>{

    const data = await getUserByRol("empleado");

    setUsers(data)
    }

    fetch();



  }, []);


  useEffect( () => {

    if (selectedDate) {


  
      const filteredHours = selectedIndex !== null
  ? users[selectedIndex].citasEmpleado
      .filter(cita => {
        // Comparar solo las fechas sin las horas (YYYY-MM-DD)
        const citaDate = new Date(cita).toISOString().split('T')[0]; // "2024-12-18"
        return citaDate === selectedDate; // selectedDate debe estar en formato "YYYY-MM-DD"
      })
      .map(cita => {
        // Extraer solo la hora (HH:mm:ss) de las citas filtradas
        const citaHora = cita.split('T')[1]; // "10:00:00"
        return citaHora;
      })
  : [];

  setHoras(filteredHours);

      
    }

  }, [selectedDate, selectedIndex]);



  const handleChange = (value: string) => {
    // Convertir el value a número para buscar el índice
    const index = users.findIndex((user) => user.id === value);
    setSelectedIndex(index);
  };


  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = Object.fromEntries(new FormData(e.currentTarget));

    const formSelectedDate = formData.dia;
    const selectedHour = formData.hora; // Aquí obtenemos la hora seleccionada

    // Crear un objeto Date usando la fecha y hora seleccionada
    const dateWithTime = new Date(
      `${formSelectedDate}T${selectedHour}.000Z`
    ).toISOString();

    // Adaptar los datos al formato requerido por la API
    const data = {
      empleadoId: formData.Barbero, // Asumiendo que el 'name' de Select es 'barbero'
      fechaCita: dateWithTime,
    };

    try {

      if (tipo > 0) {
        handleEdit(tipo,data);
      }else{
        create(data);

      }
    } catch (error) {
      console.error("Error al hacer el fetch:", error);
    }finally{
      setIsLoading(false);
    }
    
    onClose();


  };

  if (isLoading) {
    return (
      <div className="flex h-full w-full  justify-center">
    <CircularProgress aria-label="Loading..." />
    </div>
    );
    
  }

  return (

    

    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large px-8 pb-10 pt-6">
        <p className="pb-4 text-left text-3xl font-semibold">{tipo>0?`Editar cita ${tipo}`:"Crear cita"}</p>

        <Form
          className="flex flex-col gap-4s"
          validationBehavior="native"
          onSubmit={onSubmit}
        >
          <Select
            name="Barbero"
            className="w-full"
            items={users || []}
            label="Barbero"
            placeholder="Selecciona un barbero"
            onChange={(value) => handleChange(value.target.value)}
            >
            {(user) => <SelectItem>{user.name}</SelectItem>}
          </Select>

          <DatePickerC onChange={setSelectedDate} />
          <DateHoursSelect citasEmpleado={horas} />
          <Button className="w-full" color="primary" type="submit">
            Enviar
          </Button>
        </Form>
      </div>
    </div>
  );
}
