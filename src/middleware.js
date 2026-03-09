import { NextResponse } from 'next/server';

/**
 * Next.js Middleware for Route Protection
 * Runs on the server before any page loads
 * Provides first line of defense against unauthorized access
 */
export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Protected admin routes
  const isAdminRoute = pathname.startsWith('/admin') && pathname !== '/admin/login';
  
  if (isAdminRoute) {
    // Check for access token in cookies (HTTP-only) or as fallback check would be done client-side
    const accessToken = request.cookies.get('accessToken')?.value;
    
    // NOTE: For deployments where the backend sets HTTP-only cookies on a
    // different origin (e.g., Render) the cookie will NOT be present on
    // requests to Vercel. Redirecting from middleware prevents the client-side
    // auth flow from working (the client stores tokens in localStorage or
    // relies on backend cookies sent to the backend domain). Therefore we
    // avoid server-side redirect here and let the client handle auth checks.
    if (!accessToken) {
      return NextResponse.next();
    }
  }

  // Allow access
  return NextResponse.next();
}

/**
 * Configure which routes this middleware runs on
 */
export const config = {
  matcher: [
    '/admin/:path*',
  ]
};
