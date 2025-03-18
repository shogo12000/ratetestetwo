import { cookies } from "next/headers";

const CheckToken = async () => {
    try {
        const cookieStore = await cookies();
        const authCookie = cookieStore.get("auth_token")?.value;

        if (!authCookie) {
            throw new Error("Token not found");
        }

        const parsedCookie = JSON.parse(authCookie);
        console.log(parsedCookie);
        return parsedCookie.userEmail;

    } catch (error) {
        console.log("error: ", error)
    }
}

export default CheckToken