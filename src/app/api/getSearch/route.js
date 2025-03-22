import { NextResponse } from "next/server";
import connectDB from "../db/connectDB";
import userReviewModel from "../models/AddReviewModel"

export async function GET(request) {
    connectDB();
    const find = request.nextUrl.searchParams.get("find");
 
    console.log(find);
 
    try {
            const query = {};

            if (find) {
                query.$or = [
                    { courseCode: { $regex: find, $options: 'i' } },   
                    { courseTitle: { $regex: find, $options: 'i' } },                        
                    { professorName: { $regex: find, $options: 'i' } },
                    { studentReview: { $regex: find, $options: 'i' } },   
                ];
            }

 
            const reviews = await userReviewModel.find(query);

            if (reviews.length === 0) {
                return NextResponse.json({ message: "No reviews found" }, { status: 404 });
            }

            console.log(reviews);

        //     return NextResponse.json(reviews, { status: 200 });
        return NextResponse.json(reviews, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Error" }, { status: 500 });
    }
}