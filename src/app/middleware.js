import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
 
export async function middleware(request) {
  console.log("MIDDLEWARE 11111")
  // const cookieStore = await cookies();
  // const authCookie = cookieStore.get('auth_token')?.value;
  // console.log("MIDDLEWARE....")
 
  // if(!authCookie){ 
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }
 
  // const { token } = JSON.parse(authCookie);

  // const apiUrl = new URL('/api/verifytoken', request.url).toString();

  // console.log("verify token do app")
  // console.log(token);
  // console.log("token.........")
  // console.log(request.url);
  // console.log(apiUrl);
  // console.log("xxxxxxxxxxxxxxxxxx")
  // const res = await fetch( apiUrl, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${token}`,
  //   },
  // });
  // console.log("MIDDLEWARE 11111111111111")
  // console.log("res", res);
  // console.log("status --- ", res.status);

  // if(res.status != 200){
  //  return NextResponse.redirect(new URL('/', request.url))
  // }else{
  //   return NextResponse.next();
  // }

}

export const config = {
  matcher: ["/pageOne","/myReviews"],
}