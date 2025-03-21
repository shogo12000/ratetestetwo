import { NextResponse } from "next/server";
import connectDB from "../db/connectDB";
import userReview from "../models/AddReviewModel";
import CheckToken from "../../libs/checkToken";



export async function POST(request) {
    const userEmail = await CheckToken();
    
    await connectDB();

    try {
        const {
            courseCode,
            courseTitle,
            createdAt,
            professorName,
            studentReview,
            _id
        } = await request.json();

        if (!_id) {
            return NextResponse.json({ message: "ID do review é obrigatório" }, { status: 400 });
        }

        const updatedReview = await userReview.findOneAndUpdate(
            { _id, userEmail },  
            { courseCode, courseTitle, professorName, studentReview },
            { new: true }  
        )

        if (!updatedReview) {
            return NextResponse.json({ message: "Review não encontrado" }, { status: 404 });
        }

        return NextResponse.json({ message: "Review atualizado com sucesso!", review: updatedReview }, { status: 200 });

    }
    catch (error) {
        console.log("error: ", error)
    }

}