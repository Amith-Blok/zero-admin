'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Header } from '@/components/auth/header'
import { Social } from '@/components/auth/social'
import { BackButton } from '@/components/auth/back-button'
import { Suspense } from 'react'
import { LinkProps } from 'next/link'

interface CardWrapperProps {
  children: React.ReactNode
  headerLabel: string
  backButtonLabel?: string
  backButtonHref?: LinkProps<String>['href']
  showSocial?: boolean
  className?: React.ComponentProps<'div'>['className']
  showOptidanIcon?: boolean
}
//TODO: Change
export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
  className,
  showOptidanIcon = false,
}: CardWrapperProps) => {
  return (
    <Card className={className ? className : `w-[400px] shadow-md`}>
      <CardHeader>
        {/* TODO: put optidan icon in here  */}

        <Header label={headerLabel} showOptidanIcon={showOptidanIcon} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Suspense>
            <Social />
          </Suspense>
        </CardFooter>
      )}
      <CardFooter>
        {backButtonHref && backButtonLabel && (
          <BackButton label={backButtonLabel} href={backButtonHref} />
        )}
      </CardFooter>
    </Card>
  )
}
