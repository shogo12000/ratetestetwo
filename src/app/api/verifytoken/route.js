import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

export async function POST(req) { 
    console.log("CHEGOU NO VERIFY TOKEN....")
    try {
        const authorization = req.headers.get('authorization'); 

        if (!authorization) {
            return new Response('No token provided', { status: 401 });
        }

        const token = authorization.split(' ')[1]; 
        console.log("VERIFICANDO token", token);
        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            console.log('Decoded token:', decoded);
            return NextResponse.json({ success: true }, { status: 200 });
        } catch (err) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
        }
    } catch (error) {
        console.error('Erro na verificação do token:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}
