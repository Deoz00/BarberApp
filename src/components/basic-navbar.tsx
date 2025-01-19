"use client";

import type {NavbarProps} from "@nextui-org/react";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Button,
  Divider,
  cn,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import Link from 'next/link';


const menuItems = [
  "About",
  "Blog",
  "Customers",
  "Pricing",
  "Enterprise",
  "Changelog",
  "Documentation",
  "Contact Us",
];

import { useAuth } from '@/context/AuthContext';


const BasicNavbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({classNames = {}, ...props}, ref) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { user, logout } = useAuth();
    const handleLogout = () => {
      logout(); // Llama a la función de logout desde el contexto
     // router.push('/login'); // Redirige al usuario a la página de login después de hacer logout
    };

    return (
      <Navbar
        ref={ref}
        {...props}
        classNames={{
          base: cn("mt-3 border-default-100 bg-transparent", {
            "bg-default-200/50 dark:bg-default-100/50": isMenuOpen,
          }),
          wrapper: "w-full justify-center",
          item: "hidden md:flex",
          ...classNames,
        }}
        height="60px"
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        {/* Left Content */}
        <NavbarBrand>
          <div className="rounded-full bg-default-foreground text-background">
            
          </div>
          <span className="ml-2 text-small font-medium text-white">ACME</span>
        </NavbarBrand>

        {/* Center Content */}
        <NavbarContent justify="center" >
          <NavbarItem isActive className="data-[active='true']:font-medium[date-active='true']">
            <Link aria-current="page" className="text-white text-lg" href="/">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-white text-lg" href="#" >
              Servicios
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-white text-lg" href="/barberos" >
              Barberos
            </Link>
          </NavbarItem>
          {/*<NavbarItem>
            <Link className="text-white" href="#" size="lg">
              About Us
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-white" href="#" size="lg">
              Integrations
            </Link>
          </NavbarItem>*/}
        </NavbarContent>

        {/* Right Content */}
        <NavbarContent as="div" justify="end">
        {user  && (
       
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
            <DropdownItem key="profile" className="h-14 gap-2">
            <Link aria-current="page"  href="/Agendar">
              <p className="font-semibold">Sesión iniciada como</p>
              <p className="font-semibold">Nombre: {user.name}  - Usuario: {user.username}  - Rol: {user.role}</p>
              </Link>
            </DropdownItem>
             
              {//<DropdownItem key="settings">My Settings</DropdownItem>
              }
              
              <DropdownItem key="logout" color="danger" onPress={handleLogout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}

        </NavbarContent>
        
        <NavbarMenuToggle className="text-default-400 md:hidden" />

        <NavbarMenu
          className="top-[calc(var(--navbar-height)_-_1px)] max-h-fit bg-default-200/50 pb-6 pt-6 shadow-medium backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50"
          motionProps={{
            initial: {opacity: 0, y: -20},
            animate: {opacity: 1, y: 0},
            exit: {opacity: 0, y: -20},
            transition: {
              ease: "easeInOut",
              duration: 0.2,
            },
          }}
        >
          <NavbarMenuItem>
            <Button fullWidth as={Link} href="/#" variant="faded">
              Sign In
            </Button>
          </NavbarMenuItem>
          <NavbarMenuItem className="mb-4">
            <Button fullWidth as={Link} className="bg-foreground text-background" href="/#">
              Get Started
            </Button>
          </NavbarMenuItem>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link className="mb-2 w-full text-default-500" href="#" size="md">
                {item}
              </Link>
              {index < menuItems.length - 1 && <Divider className="opacity-50" />}
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    );
  },
);

BasicNavbar.displayName = "BasicNavbar";

export default BasicNavbar;
