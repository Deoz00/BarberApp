"use client";

import React from "react";
import {Button, Input, Checkbox, Link, Form} from "@nextui-org/react";
import {Icon} from "@iconify/react";
import { useState } from 'react';
import {CircularProgress} from "@nextui-org/react";
import { createUser  } from "@/services/usuariosService";
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';


interface LoginProps {
  setLogin: (set: boolean) => void;  // Tipo correcto de la prop setLogin
}
export default function Register({ setLogin }:LoginProps ) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const [loginLabel, setloginLabel] = useState<string>("");

  const toggleVisibility = () => setIsVisible(!isVisible);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
   // setIsLoading(true);

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

     try {
          const result = await createUser(data);
          //sessionStorage.setItem('jwt', result.result.token);
          login(result.result.token);
          if (result.result.role === "admin") {
            router.push("/admin");
            
          }else{
            router.push("/Agendar");
          }
    
        } catch (error: any) {
          setloginLabel(error);
        }finally{
          setIsLoading(false);
        }
  };

  const handleLoginClick = () => {
    setLogin(true); // Llamar a la función pasada desde el componente padre
  };

  if (isLoading) {
    return (
      <div className="flex h-full w-full  justify-center">
    <CircularProgress aria-label="Loading..." />
    </div>
    );
    
  }

  return (
    <div className="flex h-full w-full  justify-center">
       <div className="flex w-full max-w-sm flex-col gap-4 rounded-large px-8 pb-10 pt-6">
        <p className="pb-4 text-left text-3xl font-semibold">
          Registro
          <span aria-label="emoji" className="ml-2" role="img">
            👋
          </span>
        </p>
        <p className="text-sm text-danger min-h-[20px]">{loginLabel}</p>
        <Form className="flex flex-col gap-4" validationBehavior="native" onSubmit={handleSubmit}>
          <Input
            isRequired
            label="Nombre de usuario"
            labelPlacement="outside"
            name="userName"
            placeholder="Ingrese su nombre de usuario"
            type="text"
            variant="bordered"
          />
          <Input
            isRequired
            label="Nombre"
            labelPlacement="outside"
            name="name"
            placeholder="Ingrese su nombre"
            type="text"
            variant="bordered"
          />
          <Input
            isRequired
            endContent={
              <button type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-closed-linear"
                  />
                ) : (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-bold"
                  />
                )}
              </button>
            }
            label="Contraseña"
            labelPlacement="outside"
            name="password"
            placeholder="Ingrese su contraseña"
            type={isVisible ? "text" : "password"}
            variant="bordered"
          />
         
          <Button className="w-full" color="primary" type="submit">
            Registrar
          </Button>
        </Form>
        <p className="text-center text-small">
        <Link onPress={handleLoginClick} href="" size="sm">
        Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
