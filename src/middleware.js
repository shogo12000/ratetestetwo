import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
 
export async function middleware(request) {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('auth_token')?.value;
 
 
  if(!authCookie){ 
    return NextResponse.redirect(new URL('/login', request.url));
  }
 
  const { token } = JSON.parse(authCookie);

  const apiUrl = new URL('app/api/verifytoken', request.url).toString();

  console.log(token);
  console.log("token.........")
  const res = await fetch('./api/verifytoken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  
  console.log("res", res);
  console.log("status --- ", res.status);

  if(res.status != 200){
   return NextResponse.redirect(new URL('/pageTwo', request.url))
  }else{
    return NextResponse.next();
  }

}

export const config = {
  matcher: ["/pageOne"],
}