import { auth } from '@/auth'
import { getUserById } from '@/data/user'
import { User } from 'next-auth'

export const currentUser = async (): Promise<User | null> => {
  const session = await auth()

  return session?.user || null
}

export const getUser = async () => {
  const user = await currentUser()
  if (!user) {
    return null
  }
  const dbUser = await getUserById(user.id || '')
  if (!dbUser) {
    return null
  }
  return dbUser
}
