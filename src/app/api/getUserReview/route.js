import CheckToken from "../../libs/checkToken";
import { NextResponse } from "next/server";
import connectDB from "../db/connectDB";
import userReviewModel from "../models/AddReviewModel"
import mongoose from "mongoose";

export async function GET(request) {
    const userId = request.nextUrl.searchParams.get("userId");
    const email = await CheckToken(); 
 
    if(!email){
        return NextResponse.json({ email: email }, { status: 400 });
    }

    connectDB();

    try{
        const review = await userReviewModel.findOne({
            _id: userId      
        })

        if (!review) {
            return NextResponse.json({ message: "Review not found" }, { status: 404 });
        }
 
        return NextResponse.json(review, { status: 200 });

    }catch(error){
        return NextResponse.json({message: "internal Error"},{status: 500});
    }
}