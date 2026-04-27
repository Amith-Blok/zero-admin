import { getUser } from '@/lib/user'
import { DEFAULT_HOME_ROUTE } from '@/routes'
import { LoginForm } from '@/components/auth/login-form'
import { redirect } from 'next/navigation'

const LoginPage = async () => {
  const user = await getUser()
  if (user) {
    redirect(DEFAULT_HOME_ROUTE)
  } else {
    return <LoginForm />
  }
}

export default LoginPage
