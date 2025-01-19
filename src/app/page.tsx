
"use client"
import React from "react";
import {Button} from "@nextui-org/react";
import ModalForm from "@/components/ModalForm";
import { useAuth } from '@/context/AuthContext';


export default function Component() {
    const { user } = useAuth();
  
  return (
      
      <main className="container mx-auto flex flex-1 flex-col items-center  overflow-hidden  mt-10  px-8">
        <br /><br />
        <section className="z-20 flex flex-col items-center justify-center gap-[18px] sm:gap-6">
        
          <div className="text-center text-[clamp(40px,10vw,44px)] font-bold leading-[1.2] tracking-tighter sm:text-[100px]">
            <div className="bg-hero-section-title bg-clip-text ">
              BARBER SHOP<br /> AVCALON
            </div>
          </div>
          <p className="text-center font-normal leading-7 text-default-500 sm:w-[466px] sm:text-[18px] text-slate-200	">
            La barbería más bañada de los super conocidos.
          </p>
          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
           {!user && <ModalForm/>}
            
         
          </div>
        </section>
       
      </main>
  );
}
