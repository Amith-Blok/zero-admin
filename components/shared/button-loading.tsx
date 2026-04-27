import { Button } from '@/components/ui/button'
import { LoaderIcon } from 'lucide-react'

export default function SumbitButton({
  loading = false,
  text,
}: {
  loading: boolean
  text: string
}) {
  return (
    <Button type="submit" disabled={loading}>
      {loading && (
        <LoaderIcon
          className="-ms-1 me-2 animate-spin"
          size={16}
          strokeWidth={2}
          aria-hidden="true"
        />
      )}
      {text}
    </Button>
  )
}
