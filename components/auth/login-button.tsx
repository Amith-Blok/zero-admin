'use client'

import { useRouter } from 'next/navigation'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { LoginForm } from '@/components/auth/login-form'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { ButtonProps } from '@base-ui/react'

interface LoginButtonProps {
  children: React.ReactNode
  mode?: 'modal' | 'redirect'
  asChild?: boolean
  className?: string
  props?: ButtonProps
}

export const LoginButton = ({
  children,
  mode = 'redirect',
  asChild,
  className,
  ...props
}: LoginButtonProps) => {
  const router = useRouter()

  const handleOnClick = () => {
    router.push('/auth/login')
  }

  if (mode === 'modal') {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className="w-auto border-none bg-transparent p-0">
          <LoginForm />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Button
      onClick={handleOnClick}
      className={cn('cursor-pointer', className)}
      {...props}
    >
      {children}
    </Button>
  )
}
