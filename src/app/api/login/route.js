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
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '10h' }); 
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
        console.log(token);

 
        const response = NextResponse.json({ success: true }, { status: 200 });

 

        return response;

    } catch (error) {
        console.error('Erro no login:', error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
