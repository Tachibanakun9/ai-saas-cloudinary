import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
    "/sign-in",
    "/sign-up",
    "/",
    "/home"
])
const isPublicApiRoute = createRouteMatcher([
    "/api/videos"
])

const isAdminRoute = createRouteMatcher([
    "/admin"
])




export default clerkMiddleware((auth, req) => {
    const {userId} = auth();
    const currentUrl = new URL(req.url)
     const isAccessingDashboard = currentUrl.pathname === "/home"
     const isApiRequest = currentUrl.pathname.startsWith("/api")

     // If user is logged in and accessing a public route but not the dashboard
    if(userId && isPublicRoute(req) && !isAccessingDashboard) {
        return NextResponse.redirect(new URL("/home", req.url))
    }
    //not logged in
    if(!userId){
        // If user is not logged in and trying to access a protected route
        if(!isPublicRoute(req) && !isPublicApiRoute(req) ){
            return NextResponse.redirect(new URL("/sign-in", req.url))
        }

        // If the request is for a protected API and the user is not logged in
        if(isApiRequest && !isPublicApiRoute(req)){
            return NextResponse.redirect(new URL("/sign-in", req.url))
        }
    }
{/*
    // If the user is accessing the admin route
    if (isAdminRoute(req)) {
        // Check if the user has the required role to access the admin route
        const userRole = sessionClaims?.role; // Assuming role is stored in sessionClaims

        if (userRole !== 'admin') {
            // Redirect non-admin users to home page
            return NextResponse.redirect(new URL("/home", req.url));
        }
    }
*/}


{/*

    // If the user is accessing the admin route
    if (isAdminRoute(req)) {
        // Check if the user has the required role to access the admin route
        const userRole = sessionClaims?.customClaims?.role;
        

        if (userRole !== 'admin') {
            // Redirect non-admin users to the home page
            return NextResponse.redirect(new URL("/home", req.url));
        }
    }



*/}








    return NextResponse.next()

})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
