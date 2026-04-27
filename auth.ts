import NextAuth from 'next-auth'
import authConfig from './auth.config'
import { MongooseAdapter } from './lib/mongoose-adapter'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongooseAdapter(),
  session: { strategy: 'database' },
  pages: {
    error: '/auth/error',
  },
  ...authConfig,
})
