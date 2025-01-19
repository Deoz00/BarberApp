"use client";

import React from "react";
import { useState } from 'react';
import Login from "./Login";
import Register from "./Register";


export default function FormLogin() {
 
    const [isLogin, setIsLogin] = useState<boolean>(true);

    const setLogin = (set:boolean) => {
        setIsLogin(set)
    };
    
  return (
    <>

    {isLogin && <Login setLogin={setIsLogin} />}
  
    {!isLogin && <Register setLogin={setIsLogin} />}
    
    </>
  );
}
