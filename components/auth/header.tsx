import { Poppins } from 'next/font/google'

import { cn } from '@/lib/utils'
import Image from 'next/image'

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
})

interface HeaderProps {
  label: string
  showOptidanIcon: boolean
}

export const Header = ({ label, showOptidanIcon }: HeaderProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4">
      {showOptidanIcon && (
        <Image
          src="/optidan-logo.png"
          width="200"
          height="0"
          alt="optidan logo"
        />
      )}
      {!showOptidanIcon && (
        <h1 className={cn('text-3xl font-semibold', font.className)}>
          Optidan AI.
        </h1>
      )}
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  )
}
