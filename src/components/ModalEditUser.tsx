"use client"
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,

} from "@nextui-org/react";
import FadeInImage from "@/components/FadeInImage";
import React, { useEffect, useState } from "react";

import {Button, Input, Checkbox, Link, Form} from "@nextui-org/react";
import {Icon} from "@iconify/react";

import {Select, SelectItem} from "@nextui-org/react";

import {CircularProgress} from "@nextui-org/react";
import { s, tr } from "framer-motion/client";
import { edit as editUs, deleteUser, AdminCreateUser } from "@/services/usuariosService";


export const rol = [
  {key: "empleado", label: "Empleado"},
  {key: "cliente", label: "Cliente"},

];

interface User {
    id: string;
    name: string;
    role: string;
    userName: string;
  }

  interface props {
   // editUser: (id: string, form:FormData) => void;
  //  create: ( form:FormData) => void;
    reLoad: () => void;
    tipo: User;
    setSelectedId: React.Dispatch<React.SetStateAction<User | null>>;
  }

  export default function ModalEditUser({reLoad, tipo, setSelectedId }: props) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [openTriggered, setOpenTriggered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginLabel, setloginLabel] = useState<string>("");


  const editUser = async (id: string, form:FormData) => {
    const data = Object.fromEntries(form.entries());
    setIsLoading(true);

    try {
      await editUs(id, data);
      onOpenChange();

      
    } catch (error:any) {
      setloginLabel(error);
    }finally{
      setIsLoading(false);
      reLoad();

    }

    
  }
  const create = async (form:FormData) => {
    setIsLoading(true);

    const data = Object.fromEntries(form.entries());
    
    try {
      await AdminCreateUser(data);
      onOpenChange();

    } catch (error:any) {
      setloginLabel(error);
      
    }finally{
      setIsLoading(false);
      reLoad();

    }

    
  }


 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {


  e.preventDefault();
  setIsLoading(true);

  const form = e.currentTarget as HTMLFormElement;
  const formData = new FormData(form);
  if (typeof tipo === 'number') {
   
    await create(formData);
    
  }else{
    await editUser(tipo.id, formData);
  }
  
  setIsLoading(false);
 
 }


  useEffect(() => {
    if (tipo) {

      onOpen();
      setOpenTriggered(true);

    }
  }, [tipo]);

    useEffect(() => {
      if (openTriggered && !isOpen) {
        setSelectedId(null);
  
        setOpenTriggered(false); // Resetear flag si es necesario
      }
    }, [isOpen, openTriggered]);

  return (
    <>

    
   
      <Modal  backdrop="transparent" className=" h-[500px] bg-opacity-900  bg-neutral-900	"  isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent className="border border-gray-500		"  >
          {(onClose) => (
            <>
              
              <ModalBody>
              <div className="pointer-events-none absolute inset-0 top-[-25%] z-10 ">
              <FadeInImage
                fill
                priority
                alt="Gradient background"
                src="/bg-gradient.png"
              />
            </div>

            <div className="flex h-full w-full  justify-center">
       <div className="flex w-full max-w-sm flex-col gap-4 rounded-large px-8 pb-10 pt-6">
        <p className="pb-4 text-left text-3xl font-semibold">
        {typeof tipo === 'number' && tipo > 0 ? `Editar Usario` : "Crear Usuario"}
        </p>
        <p className="text-sm text-danger min-h-[20px]">{loginLabel}</p>

        <Form className="flex flex-col gap-4" validationBehavior="native" onSubmit={handleSubmit}>

        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">

          <Input
            isRequired
            label="Nombre de usuario"
            labelPlacement="outside"
            name="userName"
            placeholder="Ingrese nombre de usuario"
            type="text"
            variant="bordered"
            defaultValue={tipo.userName}
          />
          <Input
            isRequired
            label="Nombre"
            labelPlacement="outside"
            name="name"
            placeholder="Ingrese nombre"
            type="text"
            variant="bordered"
            defaultValue={tipo.name}
          />
          </div>
          {typeof tipo === 'number' && <Input
            isRequired
            label="Contraseña"
            labelPlacement="outside"
            name="password"
            placeholder="Ingrese contraseña"
            type="text"
            variant="bordered"
          />}
          <Select className="max-w-xs" label="Selecciona un rol"
              defaultSelectedKeys={[tipo.role]}
              name="role"
>
        {rol.map((r) => (
          <SelectItem  key={r.key}>{r.label}</SelectItem>
        ))}
      </Select>
          
         
          <Button className="w-full" color="primary" type="submit">
          {typeof tipo === 'number' && tipo > 0 ? `Editar` : "Crear"}

          </Button>
        </Form>
       
      </div>
    </div>
                

              </ModalBody>
             
            </>
          )}
        </ModalContent>
      </Modal>
      
    </>
  );
}