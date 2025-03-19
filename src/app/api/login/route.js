export const runtime = "nodejs"; 
import connectDB from "../db/connectDB";
import User from "../models/Users";
import { NextResponse } from "next/server";
import crypto from "crypto";
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

function comparePasswords(password, salt, hash) {
    const hashVerify = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
    return hash === hashVerify;
}

const generateToken = (email) => {
    const payload = { email };
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }); 
};

export async function POST(req) {
    try {
        await connectDB();   

        const { userEmail, userPassword } = await req.json();
 
        const user = await User.findOne({ userEmail });

        if (!user) {
            return NextResponse.json({ message: "Fail Login" }, { status: 400 });
        }

        if (!user || !comparePasswords(userPassword, user.salt, user.userPassword)) {
            return NextResponse.json({ message: "Invalid Credentials" }, { status: 403 });
        }

        const token = generateToken(userEmail);
 
        const response = NextResponse.json({ success: true, userName: user.userName, userEmail: user.userEmail }, { status: 200 });

        response.cookies.set({
            name: 'auth_token',
            // value: token,
            value: JSON.stringify({ token, userEmail }),
            httpOnly: true,    
            secure: process.env.APP_ENV === 'production',   
            path: '/',       
            sameSite: 'strict',  
            maxAge: 60 * 60,       
        })

        response.cookies.set({
            name: "username",
            value: user.userName,
            httpOnly: false,  // Permite acesso no frontend
            secure: process.env.APP_ENV === "production",
            sameSite: "Lax",
            maxAge: 60 * 60 ,
            path: "/",
        });

        response.cookies.set({
            name: "email",
            value: user.userEmail,
            httpOnly: false,  // Permite acesso no frontend
            secure: process.env.APP_ENV === "production",
            sameSite: "Lax",
            maxAge: 60 * 60  ,
            path: "/",
        });

        return response;

    } catch (error) {
        console.error('Erro no login:', error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
