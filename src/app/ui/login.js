'use client';
 
import { useState } from "react";
import { useAuth } from "../context/myContext";
import { useRouter } from 'next/navigation'
 

export function Login({ formType }) {
    const router = useRouter();
    const { setUserLogin } = useAuth();
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userMessage, setUserMessage] = useState("");
    const [userDisabled, setUserDisabled] = useState(false);
    const messages = {
        200: "Redirecting...",
        201: "User Registered Successfully",
        400: "Fail login",
        401: "All fields required",
        402: "User already exists",
        403: "Invalid credentials",
    };

    const handleForm = async (e) => {
        e.preventDefault();
 
        setUserDisabled(true);
        try {
            const response = await fetch(`/api/${formType}`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    userName: userName,
                    userEmail: userEmail,
                    userPassword: userPassword,
                })
            })            

            console.log(response.status);
            // 201 quando registra sucesso

            if(response.status === 200){
                console.log("logado sucesso")
                setUserLogin(true);
                setUserDisabled(false);
                router.push("/");
            }else if (response.status === 201){
                console.log("usuario cadastrado com sucesso")
                setUserMessage("Cadastrado com sucesso")
                
            }else {
                setUserMessage(messages[response.status]);
            }
            
            console.log(response);
        } catch (error) {
            console.log("Error: ", error);
            setUserMessage("An error occurred. Please try again.");
        }


        // Aqui você pode adicionar a lógica para enviar os dados para o backend ou validar.
    }
    return (
        <div>
            <h3 className="text-md font-bold">{formType}</h3>
            <form onSubmit={handleForm}>
                {formType === "register" && <input type="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="userName"
                    className={`border p-2 block w-full mb-2 ${userDisabled && "bg-gray-400"}` } 
                    disabled={userDisabled}
                    />
                }
                <input type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="Email"
                    className={`border p-2 block w-full mb-2 ${userDisabled && "bg-gray-400"}` } 
                    disabled={userDisabled} />

                <input type="password"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                    placeholder="Password"
                    className={`border p-2 block w-full mb-2 ${userDisabled && "bg-gray-400"}` } 
                    disabled={userDisabled} />

                <button disabled={userDisabled} type="submit" className="bg-blue-500 text-white p-2 w-full">{formType}</button>
                <h2 className="text-red-500">{userMessage}</h2>
            </form>
        </div>
    )
}