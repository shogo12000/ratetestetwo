import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const response = NextResponse.json({ message: "Logout realizado" });
    console.log("FEZ O LOGOUT")
    response.cookies.delete("auth_token"); // Remove o token
    response.cookies.delete("email");
    response.cookies.delete("username");
    return response;
}