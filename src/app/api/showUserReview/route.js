 

import { NextResponse } from "next/server";
import connectDB from "../db/connectDB";
import Review from "../models/AddReviewModel";
import checkToken from "../../libs/checkToken"

export async function GET() {
    connectDB();

    const email = await checkToken(); 

    try{ 
        const reviews = await Review.find({ userEmail: email });
        return NextResponse.json(reviews, {status: 200});
    }catch(error){
        return NextResponse.json({ error: "Revies data Error" }, { status: 500 });
    }

    
}
