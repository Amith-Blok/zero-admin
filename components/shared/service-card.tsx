import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { LucideIcon } from 'lucide-react'

type SubService = { label: string; href: string }

export function ServiceCard({
  title,
  description,
  href,
  icon: Icon,
  subServices = [],
}: {
  title: string
  description: string
  href: string
  icon: LucideIcon
  subServices?: SubService[]
}) {
  return (
    <Card className="h-full">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background">
              <Icon className="h-5 w-5 text-green-600" aria-hidden="true" />
              <span className="sr-only">{title} icon</span>
            </span>
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          <Button size="sm" className="text-xs" asChild>
            <Link href={href}>Open</Link>
          </Button>
        </div>
        <CardDescription className="text-pretty">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {subServices.length ? (
          <div className="flex flex-wrap gap-2">
            {subServices.map((s, index) => (
              <Link key={index} href={s.href}>
                <Badge
                  variant="secondary"
                  className="cursor-pointer border-green-200 text-green-700 hover:bg-secondary/80"
                >
                  {s.label}
                </Badge>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No sub-services listed.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
