"use client";

import React from "react";
import { Button, Input, Checkbox, Link, Form } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { Alert } from "@nextui-org/react";
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Slogin  } from "@/services/usuariosService";
import {CircularProgress} from "@nextui-org/react";


interface LoginProps {
  setLogin: (set: boolean) => void; // Tipo correcto de la prop setLogin
}
export default function Login({ setLogin }: LoginProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginLabel, setloginLabel] = useState<string>("");
  const { login, user } = useAuth();
  const router = useRouter();


  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    // Recolectar datos del formulario
    const formData = new FormData(event.currentTarget);
    const userName = formData.get("userName") as string;
    const password = formData.get("password") as string;

    // Validación rápida
    if (!userName || !password) {
      return alert("Todos los campos son obligatorios");
    }

    try {
      const result = await Slogin({ userName, password });
      const data = await login(result.result.token);



      if (data.role == "Admin") {
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
    setLogin(false); // Llamar a la función pasada desde el componente padre
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
        Sign Up
        <span aria-label="emoji" className="ml-2" role="img">
          👋
        </span>
      </p>
          <p className="text-sm text-danger min-h-[20px]">{loginLabel}</p>
          <Form
            className="flex flex-col gap-4"
            validationBehavior="native"
            onSubmit={handleSubmit}
          >
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
              placeholder="Ingrese"
              type={isVisible ? "text" : "password"}
              variant="bordered"
            />

           
            <Button className="w-full" color="primary" type="submit">
              Log In
            </Button>
          </Form>
          <p className="text-center text-small">
            <Link onPress={handleLoginClick} href="" size="sm">
              Crear cuenta
            </Link>
          </p>
        </div>
      
    </div>
  );
}
