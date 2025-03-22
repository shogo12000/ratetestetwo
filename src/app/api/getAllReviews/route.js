import CheckToken from "../../libs/checkToken";
import { NextResponse } from "next/server";
import connectDB from "../db/connectDB";
import userReviewModel from "../models/AddReviewModel"
 

export async function GET( ) { 
    connectDB();

    try{
        const review = await userReviewModel.find({})

        if (!review) {
            return NextResponse.json({ message: "Review not found" }, { status: 404 });
        }
 
        return NextResponse.json(review, { status: 200 });

    }catch(error){
        return NextResponse.json({message: "internal Error"},{status: 500});
    }
}