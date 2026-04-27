import { SignJWT, jwtVerify } from 'jose'

const PDF_TOKEN_SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET || 'your-secret-key-here'
)

export interface PdfTokenPayload {
  id: string
  type: string
  exp?: number
}

/**
 * Generate a short-lived token for PDF generation
 * Valid for 30 seconds
 */
export async function generatePdfToken(
  id: string,
  type: string
): Promise<string> {
  const token = await new SignJWT({ id, type })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30s') // Token expires in 30 seconds
    .sign(PDF_TOKEN_SECRET)

  return token
}

/**
 * Verify a PDF token
 * Returns the payload if valid, null if invalid or expired
 */
export async function verifyPdfToken(
  token: string
): Promise<PdfTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, PDF_TOKEN_SECRET)

    // Validate the payload has required fields
    if (typeof payload.id === 'string' && typeof payload.type === 'string') {
      return payload as unknown as PdfTokenPayload
    }

    return null
  } catch (error) {
    console.error('PDF token verification failed:', error)
    return null
  }
}
