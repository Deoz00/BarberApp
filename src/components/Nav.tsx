"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
 
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  
} from "@nextui-org/react";
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';



import React, { useState, useEffect } from "react";

import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";

import FormLogin from "./FormLogin/FormLogin";
export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function Nav() {
 // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user, logout } = useAuth();


 /* useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsLoggedIn(!!token); // Si hay token, está logueado
  }, []);
  
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setIsLoggedIn(false); // Actualiza el estado para reflejar el logout
  };
  */


  return (
    <>
    <Navbar maxWidth="full" isBlurred={false} className="custom-navbar ">
      <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold text-white	">ACME</p>
      </NavbarBrand>

      {false && <NavbarContent className="hidden sm:flex gap-4" justify="center">

        <NavbarItem isActive>
          <Link aria-current="page" href="/" className="text-white	" >

            Home
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link color="foreground" href="/Agendar">
          <p className="text-white	">
            Agendar cita
            </p>
          </Link>
        </NavbarItem>
        
       
      </NavbarContent>}

      

      {
        // logeado
      }
      {user  && (
        <NavbarContent as="div" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
             
              {//<DropdownItem key="settings">My Settings</DropdownItem>
              }
              
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      )}
    </Navbar>
    </>
  );
}
