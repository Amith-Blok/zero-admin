import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import {
  publicRoutes,
  authRoutes,
  API_AUTH_PREFIX,
  LOGIN_ROUTE,
  DEFAULT_HOME_ROUTE,
  MANIFEST_ROUTE,
} from '@/routes'
import { verifyPdfToken } from '@/lib/pdf-token'

// async function getUserCredits(userId: string): Promise<{ credit: number }> {
//   try {
//     const credit = await getCreditBalanceByUserId({ userId: userId })
//     return credit || { credit: 0 }
//   } catch (error) {
//     console.error('Error fetching credit data:', error)
//     return { credit: 0 }
//   }
// }

export default auth(async (req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const pathname = nextUrl.pathname

  // Allow manifest for PWA (must be public so PWA builders and install prompts can fetch it)
  if (pathname === '/manifest.webmanifest' || pathname === '/manifest') {
    return NextResponse.next()
  }
  // Check if the route is an Manifest route
  const isManifestRoute = MANIFEST_ROUTE.includes(pathname)
  // Check if the route is an API authentication route
  const isApiAuthRoute = pathname.startsWith(API_AUTH_PREFIX)

  // Check if the route is a download route (for PDF generation)
  const isDownloadRoute = pathname.startsWith('/download/')

  // Check if the route is an API route (for PDF generation and other APIs)
  const isApiRoute = pathname.startsWith('/api/')

  // Check if the route is a public route
  const isPublicRoute = publicRoutes.includes(pathname)

  // Check if the route is an auth route (login, register, etc.)
  const isAuthRoute = authRoutes.includes(pathname)

  // Allow API auth routes to pass through
  if (isApiAuthRoute) {
    return NextResponse.next()
  }

  // Allow API routes to pass through
  if (isApiRoute) {
    return NextResponse.next()
  }

  //Allow Manifest to pass through
  if (isManifestRoute) {
    return NextResponse.next()
  }

  // Handle download routes - require either authentication or valid PDF token
  if (isDownloadRoute) {
    // Check for PDF token in query params
    const pdfToken = nextUrl.searchParams.get('pdf_token')

    if (pdfToken) {
      // Verify the PDF token
      const tokenPayload = await verifyPdfToken(pdfToken)
      if (tokenPayload) {
        // Valid token, allow access
        return NextResponse.next()
      }
    }

    // If no valid token, require authentication
    if (!isLoggedIn) {
      const callbackUrl = encodeURIComponent(pathname + nextUrl.search)
      return NextResponse.redirect(
        new URL(`${LOGIN_ROUTE}?callback=${callbackUrl}`, nextUrl)
      )
    }

    // User is authenticated, allow access
    return NextResponse.next()
  }

  // If user is on auth route and logged in, redirect to dashboard
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_HOME_ROUTE, nextUrl))
    }
    return NextResponse.next()
  }

  // Allow public routes for everyone
  if (isPublicRoute) {
    return NextResponse.next()
  }

  // For protected routes, redirect to login if not authenticated
  if (!isLoggedIn) {
    const callbackUrl = encodeURIComponent(pathname + nextUrl.search)
    return NextResponse.redirect(
      new URL(`${LOGIN_ROUTE}?callback=${callbackUrl}`, nextUrl)
    )
  }

  // Handle /no-credit route - redirect to home if user has credits
  //   if (pathname === '/no-credit' && isLoggedIn) {
  //     const creditData = await getUserCredits(req.auth?.user.id || '')
  //     if (creditData.credit > 0) {
  //       return NextResponse.redirect(new URL(DEFAULT_HOME_ROUTE, nextUrl))
  //     }
  //     return NextResponse.next()
  //   }

  //   // Check user credits for authenticated users accessing protected routes
  //   const creditData = await getUserCredits(req.auth?.user.id || '')
  //   if (creditData.credit <= 0) {
  //     return NextResponse.redirect(new URL('/no-credit', nextUrl))
  //   }

  // Add current path header for any components that need it
  const headers = new Headers(req.headers)
  headers.set('x-current-path', pathname)

  return NextResponse.next({
    request: {
      headers,
    },
  })
})

export const config = {
  matcher: [
    // match all routes except static files, APIs, and PWA manifest
    '/((?!api|_next/static|_next/image|favicon.ico|manifest\\.webmanifest|manifest|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|json)$).*)',
  ],
}
