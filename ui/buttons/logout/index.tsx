'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  // Create a Supabase client configured to use cookies
  const supabase = createClientComponentClient()

  const signOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <button
    className="py-1 px-4 rounded-md no-underline bg-gray-400 hover:bg-gray-500 text-white"
    onClick={signOut}
    >
      Logout
    </button>
  )
}
