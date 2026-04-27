'use client'

import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { DEFAULT_HOME_ROUTE } from '@/routes'

export const Social = () => {
  const searchParams = useSearchParams()!
  const callbackUrl = searchParams.get('callback')

  const onClick = (provider: 'google') => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_HOME_ROUTE,
    })
  }

  return (
    <div className="flex w-full flex-col items-center gap-y-4">
      <Button
        size="lg"
        className="w-full gap-2"
        variant="outline"
        onClick={() => onClick('google')}
      >
        <FcGoogle className="h-5 w-5" /> <span>Sign in with google</span>
      </Button>
    </div>
  )
}
