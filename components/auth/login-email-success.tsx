import { Button } from '../ui/button'
import Image from 'next/image'
import { FormSuccess } from '@/components/form-status/form-success'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import Link from 'next/link'

export const LoginEmailSuccessful = () => {
  return (
    <div className="flex w-full items-start justify-center">
      <Card className="z-10 h-screen w-full rounded-none py-4 md:w-2/4 lg:w-1/4">
        <CardHeader className="flex flex-col items-center justify-center gap-5">
          <CardTitle className="text-md flex items-center justify-center gap-2 font-bold">
            <Image
              src="/logo_zf.png"
              width={180}
              height={25}
              alt="zero freights logo"
              className="rounded-md"
            />
          </CardTitle>
          <CardTitle className="font-extrabold">
            Sign In to Zero Freights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <>
            <FormSuccess
              message="We have sent a link to your email address. Please check your email and click the link in the email you received to continue."
              className="h-20 w-20"
            />
            <Button className="mt-5 w-full" asChild>
              <Link href="/auth/login">Back</Link>
            </Button>
          </>
        </CardContent>
      </Card>
      <div className="hidden md:block md:w-2/4 lg:w-3/4">
        <Image
          src="/login-bg.png"
          fill
          style={{ objectFit: 'contain' }}
          alt="zero freights login banner"
        />
      </div>
    </div>
  )
}
