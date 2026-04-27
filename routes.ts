/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ['/']

/**
 * The default login path
 * @type {string}
 */
export const LOGIN_ROUTE = '/auth/login'

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
  LOGIN_ROUTE,
  '/auth/login/email-send',
  '/auth/register',
  '/auth/blok-verification',
  '/auth/error',
  '/auth/reset',
  '/auth/new-password',
]

/**
 * An array of routes that are manifest
 */

export const MANIFEST_ROUTE = [
  '/manifest.webmanifest',
  '/manifest',
  '/manifest.json',
  '/sw.js',
  '/favicon.ico',
]

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const API_AUTH_PREFIX = '/api/auth'

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_HOME_ROUTE = `/`
