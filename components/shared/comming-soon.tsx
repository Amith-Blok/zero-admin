import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Mail } from 'lucide-react'
import Link from 'next/link'

export function ComingSoon() {
  return (
    <div className="flex min-h-full items-center justify-center bg-white p-4 dark:bg-black">
      <Card className="mx-auto w-full max-w-2xl bg-white/80 shadow-2xl backdrop-blur-sm dark:bg-slate-900/80">
        <CardContent className="space-y-8 p-12 text-center">
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
              Coming Soon
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              This page is currently under development.
            </p>
          </div>

          {/* Description */}
          <div className="mx-auto max-w-lg space-y-4">
            <p className="leading-relaxed text-slate-500 dark:text-slate-400">
              This page is currently being developed. We are working to make it
              available as soon as possible.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
              asChild
            >
              <Link
                href="https://www.bloksupplychain.com/contact"
                className="flex items-center space-x-2"
              >
                <Mail className="mr-2 h-4 w-4" />
                Contact Us
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="https://www.bloksupplychain.com">Learn More</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
