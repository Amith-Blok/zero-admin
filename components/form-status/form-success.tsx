import { CheckCircle } from 'lucide-react'
import { ComponentProps } from 'react'

interface FormSuccessProps {
  message?: string
  className?: ComponentProps<'span'>['className']
}

export const FormSuccess = ({ message, className }: FormSuccessProps) => {
  if (!message) return null

  return (
    <div className="flex items-center gap-x-2 rounded-md bg-emerald-500/15 p-3 text-sm text-emerald-500">
      <CheckCircle className={className ? className : `h-8 w-8`} />
      <p>{message}</p>
    </div>
  )
}
