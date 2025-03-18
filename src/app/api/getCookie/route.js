import { cookies } from "next/headers";

export async function GET() {
    const cookieStore = await cookies();
    const authCookie =   cookieStore.get("auth_token")?.value;
    console.log("xxxxxxxxxxxxxxxxxx")
    if (!authCookie) {
        return Response.json({ error: "Token not found" }, { status: 401 });
    }
    console.log("aaaaaaaaaaaaaaaaaaaaaaa")
    try {
        const parsedCookie = JSON.parse(authCookie);
        return Response.json({ userEmail: parsedCookie.userEmail }, {status: 200});
    } catch (error) {
        console.error("Erro ao analisar JSON:", error);
        return Response.json({ error: "Invalid token format" }, { status: 400 });
    }
}