'use client'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useForm } from 'react-hook-form'
import { LoginSchema } from '@/schema/login-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ResendLoginAction } from '@/actions/resend'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Social } from './social'
import { useRouter } from 'next/navigation'

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  })
  const router = useRouter()
  const onHandleSubmit = async (data: z.infer<typeof LoginSchema>) => {
    console.log({ data })
    await ResendLoginAction(data)
    reset()
    router.replace('/auth/login/email-send')
  }
  const watchEmail = watch('email')
  return (
    <div className="flex w-full items-start justify-center">
      <Card className="z-10 h-screen w-full rounded-none py-4 md:w-2/4 lg:w-1/4">
        <CardHeader className="flex flex-col items-center justify-center gap-5">
          <CardTitle className="text-md flex items-center justify-center gap-2 font-bold">
            <Image
              src="/logo_zf.png"
              width={180}
              height={25}
              alt="optidan-logo"
              className="rounded-md"
            />
          </CardTitle>
          <CardTitle className="font-extrabold">
            Sign In to Zero Freights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 pt-4">
            <Social />

            <div className="flex w-full items-center justify-center">
              <div className="w-full flex-grow border-t border-gray-300"></div>
              <span className="mx-4 px-2 text-xs text-muted-foreground">
                OR
              </span>
              <div className="w-full flex-grow border-t border-gray-300"></div>
            </div>

            <form onSubmit={handleSubmit(onHandleSubmit)} className="space-y-5">
              <Input placeholder="example32@gmail.com" {...register('email')} />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
              <Button type="submit" disabled={!watchEmail} className="w-full">
                Sign in with email
              </Button>
              <p className="w-full rounded-lg bg-muted p-3 font-sans text-sm text-slate-500">
                ✨We&apos;ll email you a magic code for a password-free sign-in.
              </p>
            </form>
          </div>
        </CardContent>
      </Card>
      <div className="hidden md:block md:w-2/4 lg:w-3/4">
        <Image
          src="/layout_bg.jpg"
          fill
          style={{ objectFit: 'cover' }}
          alt="zero freights login banner"
        />
      </div>
    </div>
  )
}
