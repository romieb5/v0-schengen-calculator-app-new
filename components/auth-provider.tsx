"use client"

import { createContext, useContext, type ReactNode } from "react"
import { authClient } from "@/lib/auth-client"

interface AuthContextType {
  user: { id: string; email: string; name?: string } | null
  isAuthenticated: boolean
  isLoading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, isPending } = authClient.useSession()

  const user = session?.user
    ? { id: session.user.id, email: session.user.email, name: session.user.name }
    : null

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/log-in"
        },
      },
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading: isPending,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
