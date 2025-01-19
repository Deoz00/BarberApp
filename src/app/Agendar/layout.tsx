"use client"
import { DateProvider } from '@/context/DateContext';
import React from 'react';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from '@/context/AuthContext';


export default function AgendarLayout({
  children, 
}: {
  children: React.ReactNode;
}) {

  const user = useAuth(); // Obtén los datos del usuario, incluyendo el rol
    const router = useRouter();

  useEffect(() => {

    if (!user.user){
      router.push("/"); // Redirige si no es admin
    }
  }, [router]);



  return (
   
    <DateProvider>
      {children}
      </DateProvider>
  );
}
