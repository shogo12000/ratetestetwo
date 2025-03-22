"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { getAllReviews, searchData } from "../services/services";

export const AuthContext = createContext();


export function AuthProvider({ children }) {
    const [userLogin, setUserLogin] = useState(false);
    const [userDataReview, setUserDataReview] = useState({});
    const [ dataSearch , setDataSearch ] = useState([])

    const handleLogout = async () => {
        await fetch("/api/logout", {
            method: "POST",
            credentials: "include",
        });
        setUserLogin(false);
        redirect("/");
    }

    const getSearchData = async(findWord)=>{
        console.log(findWord);
        if(!findWord){  
            try {
                const response = await getAllReviews();

                if (!response.ok) {
                    throw new Error("error try again!!!");
                }

                const data = await response.json();
                console.log(data);
                setDataSearch(data);

            } catch (error) {
                setPageError(true)
            }
        }else{
            try{
                const response = await searchData(findWord);
    
                if(response.ok){
                    const mySearch = await response.json();
                    setDataSearch(mySearch);
                }else{
                    console.log("error");
                }
            }catch(error){
                throw error;
            }
        }

    }

    useEffect(() => {
        console.log("useeffect da nav")
        const checkCookie = async () => {
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
 
        const interval = setInterval(async () => {  
            await checkCookie();
        }, 600000);  
 
        return () => clearInterval(interval);
    }, [])

    const contextMyReview = async ()=>{ 
        const resp = await fetch("/api/showUserReview" );
        const data = await resp.json();
        setUserDataReview(data);   
    }

    return (
        <AuthContext value={{ handleLogout, userLogin, setUserLogin, contextMyReview, userDataReview, getSearchData, dataSearch}}>
            {children}
        </AuthContext>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}