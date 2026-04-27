/* eslint-disable no-unused-vars */
import { type DefaultSession } from 'next-auth';

export type ExtendedUser = DefaultSession['user'] & {
  companyName?: string;
  phone?: string;
  blokVerified?: Date;
  isBanned?: Date;
  role?: 'ADMIN' | 'USER';
};

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
  }

  interface User {
    companyName?: string;
    phone?: string;
    blokVerified?: Date;
    isBanned?: Date;
    role?: 'ADMIN' | 'USER';
  }
}
