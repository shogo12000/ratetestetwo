"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { redirect } from "next/navigation";
 
export const AuthContext = createContext();
 

export function AuthProvider({children}){
    const [userLogin, setUserLogin] = useState(false);

    const handleLogout = async ()=>{
        await fetch("/api/logout",{
            method: "POST",
            credentials: "include",
        });
        setUserLogin(false);
        redirect("/");
    }

    useEffect(()=>{
        console.log("useeffect da nav")
        const checkCookie = async ()=>{
            try {
                const res = await fetch("/api/getCookie");
     
                if (res.ok) {
                    setUserLogin(true);
                } else {
                    setUserLogin(false);
                }
            } catch (error) {
                console.error("Erro ao verificar autenticação:", error);
                setUserLogin(false);
            }
        }
        checkCookie();
    }, [userLogin])

    return (
        <AuthContext value={{ handleLogout, userLogin, setUserLogin }}>
            {children}
        </AuthContext>
    )
}

export function useAuth(){
    return useContext(AuthContext);
}