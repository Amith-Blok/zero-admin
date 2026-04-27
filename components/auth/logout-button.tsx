'use client'

import { signOut } from 'next-auth/react'
import { Button } from '../ui/button'

interface LogoutButtonProps {
  children?: React.ReactNode
}
export const LogoutButton = ({ children }: LogoutButtonProps) => {
  return (
    <Button onClick={async () => signOut()} size="sm" variant={'outline'}>
      {children}
    </Button>
  )
}
