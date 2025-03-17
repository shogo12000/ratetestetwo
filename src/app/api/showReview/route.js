import { NextResponse } from "next/server";
import connectDB from "../db/connectDB";

export async function GET() {
    connectDB();
    
    return NextResponse.json({ message: "funcionando" }, { status: 200 });
    
}
