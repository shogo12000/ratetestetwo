import { NextResponse } from "next/server";
import CheckToken from "../../libs/checkToken";
import connectDB from "../db/connectDB";
import userReviewModel from "../models/AddReviewModel"

export async function GET(request) {

    try{
        const reviewId = request.nextUrl.searchParams.get("reviewId");
        const email = await CheckToken(); 
    
        if(!email){
            return NextResponse.json({ email: email }, { status: 400 });
        }
    
        connectDB();
    
        const deletedReview = await userReviewModel.findOneAndDelete({
            _id: reviewId,
            userEmail: email,  
        });
    
        if (!deletedReview) {
            return NextResponse.json({ message: "Revisão não encontrada ou não pertence ao usuário" }, { status: 404 });
        }
        
        console.log(deletedReview);

        return NextResponse.json({ message: "Revisão deletada com sucesso" }, { status: 200 });        
    }catch(error){
        console.error("Erro: ", error);
        return NextResponse.json({messsage: error})
    }

}