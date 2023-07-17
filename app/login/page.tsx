'use client'

import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import LogoSVG from '../logo'
// import Link from 'next/link'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [view, setView] = useState('sign-in')
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })
    setView('check-email')
  }

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await supabase.auth.signInWithPassword({
      email,
      password,
    })
    router.push('/home')
    router.refresh()
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4 sm:px-0">
      <div className="max-w-md w-full space-y-8">
        <div className="flex items-center justify-center">
        <LogoSVG />
        </div>
        {view === 'check-email' ? (
          <p className="text-center text-foreground">
            Check <span className="font-bold">{email}</span> to continue signing
            up
          </p>
        ) : (
          <form
            className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
            onSubmit={view === 'sign-in' ? handleSignIn : handleSignUp}
          >
            <label className="text-md" htmlFor="email">
              Email
            </label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-6"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="you@example.com"
            />
            <label className="text-md" htmlFor="password">
              Password
            </label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-6"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="••••••••"
            />
            {view === "sign-in" && (
              <>
                <button className="bg-red-500 rounded px-4 py-2 text-white mb-6">
                  Sign In
                </button>
                <p className="text-sm text-center">
                Don&apos;t have an account?
                  <button
                    className="ml-1 underline"
                    onClick={() => setView('sign-up')}
                  >
                    Sign Up Now
                  </button>
                </p>
              </>
            )}
            {view === "sign-up" && (
              <>
                <button className="bg-red-500 rounded px-4 py-2 text-white mb-6">
                  Sign Up
                </button>
                <p className="text-sm text-center">
                  Already have an account?
                  <button
                    className="ml-1 underline"
                    onClick={() => setView('sign-in')}
                  >
                    Sign In Now
                  </button>
                </p>
              </>
            )}
          </form>
        )}
      </div>
    </div>
  );
  
}
