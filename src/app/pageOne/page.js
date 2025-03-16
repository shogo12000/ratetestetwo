'use client';
import { redirect } from 'next/navigation'
import LogoutBtn from "../components/btnLogout"
 

const pageOne = ()=>{

 
    return (
        <div>
            <h1>PAGE ONE</h1>
            <LogoutBtn />
        </div>
    )
}

export default pageOne