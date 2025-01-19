"use client"
import { ThemeProvider } from 'next-themes';

import { NextUIProvider } from "@nextui-org/react";
import { ReactNode } from 'react';
import { useEffect, useState } from 'react'; // Usamos useState y useEffect


interface ProviderProps {
  children: ReactNode;
}
export default function Provider({ children }: ProviderProps) {
  const [mounted, setMounted] = useState(false);

    // Asegúrate de que el tema solo se aplique después de que el componente se haya montado en el cliente
    useEffect(() => {
      setMounted(true); // Cambia el estado cuando el cliente se haya montado
    }, []);
  
    if (!mounted) {
      // Si no se ha montado el componente, retorna null para evitar el parpadeo de la página
      return null;
    }
  return (
    <ThemeProvider defaultTheme="dark" enableSystem={false} attribute="class">
      <NextUIProvider >
        {children}
      </NextUIProvider>
    </ThemeProvider>

  );
}