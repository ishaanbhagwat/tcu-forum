// app/components/Protected.tsx
'use client'

import { useAuth } from '@/providers/AuthProvider'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Protected({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])
  
  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>
  }
  
  if (!user) {
    return null // Will redirect in the useEffect
  }
  
  return <>{children}</>
}