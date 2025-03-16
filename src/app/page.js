import Image from "next/image";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const useremail = cookieStore.get('email')?.value;
  const username = cookieStore.get('username')?.value;
  return (
    <div className="">
      <h1>PAGINA UM</h1>
      {username} 
      {useremail}
      <p>pagina</p>
    </div>
  );
}
