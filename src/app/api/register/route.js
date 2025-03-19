export const runtime = "nodejs";
import connectDB from "../db/connectDB";
import User from "../models/Users";
import crypto from "crypto";

function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
    return { salt, hash };
}

export async function POST(request) {
    await connectDB();
  
    try {
        const { userName, userEmail, userPassword } = await request.json();
        console.log(userEmail);
        console.log(userPassword);
        if (!userName || !userEmail || !userPassword) {
            return Response.json({ message: "All Fields Required" }, { status: 401 })
        }

        const existingUser = await User.findOne({ userEmail })

        if (existingUser) {
            return Response.json({ message: "User Already Exist" }, { status: 402 });
        }

        const { salt, hash } = hashPassword(userPassword);

        const newUser = new User({ userName: userName, userEmail: userEmail, userPassword: hash, salt: salt });
        const savedUser = await newUser.save();

        if (savedUser) {
            return Response.json({ message: "User Registered Successfully" }, { status: 201 });
        } else {
            return Response.json({ message: "Error Saving User" }, { status: 500 });
        }
        // const hashPassword = await bcrypt.hash(userPassword, 10);

        // const newUser = new User({ userName: userName, userEmail: userEmail, userPassword: hashPassword });

        // const savedUser = await newUser.save();

        // if(savedUser){

        // }else{
        //     return Response.json({ message: "Error Saving User"}, { status: 500 });
        // } 
    }
    catch (error) {
        console.log("error: ", error)
    }
}