// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// const protectedRoutes = ["/member"];
// const unprotectedRoutes = ["/", "/auth/login", "/auth/signup"];

// import { auth } from "@/lib/auth";

// export default async function middleware(request: NextRequest) {
//   const session = await auth();

//   const isProtectedRoute = protectedRoutes.some((prefix) =>
//     request.nextUrl.pathname.startsWith(prefix)
//   );

//   if (!session && isProtectedRoute) {
//     const absoluteURL = new URL("/", request.nextUrl.origin);
//     return NextResponse.redirect(absoluteURL.toString());
//   }
//   if (session && unprotectedRoutes.includes(request.nextUrl.pathname)) {
//     const absoluteURL = new URL("/member", request.nextUrl.origin);
//     return NextResponse.redirect(absoluteURL.toString());
//   }
// }
