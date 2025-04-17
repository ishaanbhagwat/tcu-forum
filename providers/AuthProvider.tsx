'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { supabase } from '../lib/supabaseClient'
import { User, Session } from '@supabase/supabase-js'

type AuthContextType = {
  user: User | null
  session: Session | null
  signUp: (email: string, password: string, username: string) => Promise<any>
  signIn: (email: string, password: string) => Promise<any>
  signOut: () => Promise<any>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get current session
    const getSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    }
    
    getSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, username: string) => {
    // Create the auth user in Supabase
    const { data, error } = await supabase.auth.signUp({ email, password })
    
    if (error) throw error
    
    if (data.user) {
      // Create the user record in your database with the username
      // This would normally be done via an API route
      try {
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: data.user.id,
            email: email,
            username: username,
          }),
        })
        
        if (!response.ok) {
          throw new Error('Failed to create user profile')
        }
      } catch (err) {
        console.error("Error creating user profile:", err)
        throw new Error("Username already taken or database error")
      }
    }
    
    return data
  }
  
  const signIn = (email: string, password: string) => 
    supabase.auth.signInWithPassword({ email, password })
  
  const signOut = () => supabase.auth.signOut()

  return (
    <AuthContext.Provider value={{ user, session, signUp, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}