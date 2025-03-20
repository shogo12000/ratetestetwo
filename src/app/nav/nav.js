'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthContext } from "../context/myContext";
import { useContext, useEffect } from "react";

const Nav = ({ children }) => {
    const { userLogin, setUserLogin } = useContext(AuthContext);
    const pathname = usePathname();

    const linkClass = (path) =>
        pathname === path ? "text-green-500 font-bold" : "text-black";

    useEffect(() => {
        const checkCookie = async () => {
            const response = await fetch("/api/getCookie");
            const check = await response.json();
            console.log(check.userEmail);
            if (!check.userEmail) {
                setUserLogin(false);
            }

        }

        checkCookie();
    }, [pathname])

    return (
        <>
            <nav className="flex justify-between p-5">
                <div className="flex gap-5">
                    <Link href="/" className={linkClass("/")}>Home</Link>
                    <Link href="/allReviews" className={linkClass("/allReviews")}>AllReviews</Link>
                    {userLogin && (
                        <>
                            <Link href="/pageOne" className={linkClass("/pageOne")}>AddReview</Link>
                            <Link href="/myReviews" className={linkClass("/myReviews")}>MyReviews</Link>
                        </>
                    )}
                </div>
                <div className="flex gap-5">
                    {!userLogin && (
                        <>
                            <Link href="/login" className={linkClass("/login")}>Login</Link>
                            <Link href="/register" className={linkClass("/register")}>Register</Link>
                        </>
                    )}
                </div>
            </nav>
            {children}
        </>
    );
};

export default Nav;
