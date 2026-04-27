'use server'

import { signIn } from '@/auth'

export const ResendLoginAction = async (data: any) => {
  await signIn('resend', { redirect: false, email: data.email })
}
