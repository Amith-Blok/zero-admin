import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogoutButton } from '../auth/logout-button'
import { IoMdExit } from 'react-icons/io'
import { useSession } from 'next-auth/react'
import { LoginButton } from '../auth/login-button'
import Link from 'next/link'

const ProfileButton = () => {
  const { status, data } = useSession()

  // Function to get initials from name
  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U'

    const words = name.trim().split(/\s+/)

    if (words.length >= 2) {
      // First letter of first word + first letter of last word
      return (words[0][0] + words[words.length - 1][0]).toUpperCase()
    } else if (words[0].length >= 2) {
      // First two letters of first word
      return words[0].substring(0, 2).toUpperCase()
    } else {
      // Single letter
      return words[0][0].toUpperCase()
    }
  }

  return status === 'authenticated' ? (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none focus:outline-none focus-visible:outline-none">
        <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 text-xl font-semibold text-white shadow-md ring-2 ring-green-100 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:ring-green-200">
          {data.user.name?.toUpperCase()?.charAt(0)}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href="/settings/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" disabled>
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" disabled>
          Payment History
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <LogoutButton>
          <DropdownMenuItem>
            <IoMdExit className="mr-2 h-4 w-4" />
            Sign Out
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <LoginButton
      className="border-green-200"
    >
      <div className="flex cursor-pointer items-center justify-center">
        <IoMdExit className="mr-2 h-4 w-4" />
        <span className="font-sans text-sm">Sign In</span>
      </div>
    </LoginButton>
  )
}

export default ProfileButton
