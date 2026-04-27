import { LoginEmailSuccessful } from '@/components/auth/login-email-success'
import { getUser } from '@/lib/user'
import { DEFAULT_HOME_ROUTE } from '@/routes'
import { redirect } from 'next/navigation'

const EmailSendPage = async () => {
  const user = await getUser()
  if (user) {
    redirect(DEFAULT_HOME_ROUTE)
  } else {
    return <LoginEmailSuccessful />
  }
}

export default EmailSendPage
