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
                    <Link href="/allReviews">AllReviews</Link>
                    {userLogin &&
                        <>
                            <Link href="/pageOne">AddReview</Link>
                            <Link href="/myReviews">MyReviews</Link>
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