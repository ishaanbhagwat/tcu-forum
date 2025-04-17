// app/components/SignUp.tsx
'use client'

import { useState } from 'react'
import { useAuth } from '@/providers/AuthProvider'
import { useRouter } from 'next/navigation'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  
  const { signUp } = useAuth()
  const router = useRouter()
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    
    try {
      await signUp(email, password, username)
      router.push('/') // Redirect to home page after signup
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}
      
      <div className="mb-4">
        <label htmlFor="email" className="block mb-1">Email</label>
        <input 
          id="email"
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="username" className="block mb-1">Username</label>
        <input 
          id="username"
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded"
          pattern="[a-zA-Z0-9_]+" 
          title="Username can only contain letters, numbers, and underscores"
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="password" className="block mb-1">Password</label>
        <input 
          id="password"
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          minLength={6}
          required
        />
      </div>
      
      <button 
        type="submit" 
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        disabled={loading}
      >
        {loading ? 'Creating Account...' : 'Sign Up'}
      </button>
    </form>
  )
}