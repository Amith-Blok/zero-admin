import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Package2 } from 'lucide-react'

export default async function ErrorPage(props: {
  searchParams: Promise<{ error?: string }>
}) {
  const searchParams = await props.searchParams
  const isVerificationError = searchParams.error === 'Verification'
  const verificationErrorHeader = 'Unable to Sign in'
  const verificationErrorMessage =
    'Oops! The sign in link is no longer valid. It may have been used already or it may have expired..'
  const defaultHeader = 'Authentication Failed'
  const defaultMessage = 'Something went wrong!!'
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background text-foreground">
      <h1 className="mb-4 text-6xl font-bold">401</h1>
      <h2 className="mb-8 text-2xl">
        {isVerificationError ? verificationErrorHeader : defaultHeader}
      </h2>
      <p className="mb-8 max-w-md text-center">
        <span className="inline-block pb-1 align-bottom">
          <Package2 size={18} />
        </span>{' '}
        {isVerificationError ? verificationErrorMessage : defaultMessage}
      </p>

      <Link href="/auth/login" passHref>
        <Button>Sign In</Button>
      </Link>
    </div>
  )
}
