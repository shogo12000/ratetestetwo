'use client';
const { default: Link } = require("next/link")
import { AuthContext } from "../context/myContext";
import { useContext } from "react";

const Nav = ({ children }) => {
    // const { userLogin } = useAuth();
    const { userLogin } = useContext(AuthContext);
    console.log("userLogin", userLogin)
    return (
        <>
            <nav className="flex justify-between p-5">
                <div className="flex gap-5">
                    <Link href="/">Home</Link>
                    {userLogin &&
                        <>
                            <Link href="/pageOne">pageOne</Link>
                            <Link href="/pageTwo">pageTwo</Link>
                        </>
                    }
                </div>
                <div className="flex gap-5">
                    {!userLogin &&
                        <>
                            <Link href="/login">Login</Link>
                            <Link href="/register">Register</Link>
                        </>
                    }
                    {/* <Link href="/login" className="text-blue-500">Open modal</Link> */}
                </div>
            </nav>
            {children}
        </>
    )
}

export default Nav;