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
    
    // No token found - redirect to login
    if (!accessToken) {
      const loginUrl = new URL('/admin/login', request.url);
      const response = NextResponse.redirect(loginUrl);
      
      // Set cache control headers to prevent caching
      response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      response.headers.set('Pragma', 'no-cache');
      response.headers.set('Expires', '0');
      
      return response;
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
