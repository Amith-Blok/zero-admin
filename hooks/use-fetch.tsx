/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useEffect, useState } from 'react'
export default function useFetch<T>(url: string): {
  data: T[]
  loading: boolean
  error: Error | null
} {
  const [data, setData] = useState<any>([])
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = (await fetch(url, {
        cache: 'no-cache',
      }).then((response) => response.json())) as any
      setData(res.items)
    } catch (error) {
      console.log(error)
      setError(error instanceof Error ? error : new Error('Unkown error'))
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error }
}
