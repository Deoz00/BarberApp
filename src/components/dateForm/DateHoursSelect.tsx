import {Select, SelectItem} from "@nextui-org/react";

export const horas = [
    { key: "09:00:00", label: "9:00 AM" },
    { key: "10:00:00", label: "10:00 AM" },
    { key: "11:00:00", label: "11:00 AM" },
    { key: "12:00:00", label: "12:00 PM" },
    { key: "13:00:00", label: "1:00 PM" },
    { key: "14:00:00", label: "2:00 PM" },
    { key: "15:00:00", label: "3:00 PM" },
    { key: "16:00:00", label: "4:00 PM" },
    { key: "18:00:00", label: "6:00 PM" },
  ];
export const horasNoDisponibles = [
    "09:00",
    "11:00",
    "12:00",
    "14:00",
    "15:00",
    "18:00",
  ];

  interface ChildComponentProps {
    citasEmpleado: string[];
  }

export default function DateHoursSelect({ citasEmpleado }: ChildComponentProps) {
  return (
    <Select
    name="hora"
      className="max-w-xs"
      disabledKeys={citasEmpleado}
      label="Hora de la cita"
      placeholder="Selecciona una hora"
      isRequired
    >
      {horas.map((horas) => (
        <SelectItem key={horas.key}>{horas.label}</SelectItem>
      ))}
    </Select>
  );
}
