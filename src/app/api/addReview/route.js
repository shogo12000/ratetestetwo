import { NextResponse } from "next/server";
import connectDB from "../db/connectDB";
import User from "../models/Users";
import AddReview from "../models/addReview";
import checkToken from "../../libs/checkToken";
import Review from "../models/addReview";



export async function POST(req) {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Adiciona o zero se necessário
    const year = today.getFullYear();
    const saveToday = `${day}/${month}/${year}`;

    const { subTitle,
        courseCode,
        courseTitle,
        professorName,
        studentReview } = await req.json();

    if (!subTitle ||
        !courseCode ||
        !courseTitle ||
        !professorName ||
        !studentReview
    ) {
        return Response.json({ message: "All Fields Required" }, { status: 401 })
    }

    const email = await checkToken();

    if (!email) {
        return Response.json({ message: "User not found" }, { status: 401 })
    }

    connectDB();

    const user = await User.findOne({ userEmail: email });

    if (!user) {
        return NextResponse.json({ message: "Fail " }, { status: 400 });
    }

    const newReview = new AddReview({
        userEmail: email,
        subTitle: subTitle,
        courseCode: courseCode,
        courseTitle: courseTitle,
        professorName: professorName,
        studentReview: studentReview,
        createdAt: saveToday
    })

    const saveReview = await newReview.save();

    if (saveReview) {
        return NextResponse.json({ success: true }, { status: 200 });
    } else {
        return NextResponse.json({ success: false }, { status: 400 });
    }

}