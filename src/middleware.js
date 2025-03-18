import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function middleware(request) {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('auth_token')?.value;
 

    if (!authCookie) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // const { token } = JSON.parse(authCookie);

    // const apiUrl = new URL('/api/verifytoken', request.url).toString();

    // console.log(request.url);
    // console.log(apiUrl);

    // const res = await fetch(apiUrl, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`,
    //   },
    // });

    // console.log("status --- ", res.status);
    return NextResponse.next();
    // if (res.status !== 200) {
    //   return NextResponse.redirect(new URL('/', request.url))
    // } else {
    //   return NextResponse.next();
    // }
  } catch (error) {
    console.error('Erro no middleware:', error);
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: ["/pageOne", "/myReviews"],
}