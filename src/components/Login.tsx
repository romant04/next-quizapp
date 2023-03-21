import React, { useEffect } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

function Login() {
  const { data: session } = useSession()

  if (session) {
    return (
      <div className="flex flex-row items-center gap-3">
        <p>Welcome, {session.user?.email}</p>
        <button
          className="px-10 py-2 font-semibold text-black transition-all duration-200 ease-out bg-white rounded-xl text-md hover:bg-yellow-400"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    )
  } else {
    return (
      <div>
        <button
          className="px-10 py-2 font-semibold text-black transition-all duration-200 ease-out bg-white rounded-xl text-md hover:bg-yellow-400"
          onClick={() => signIn()}
        >
          Sign in
        </button>
      </div>
    )
  }
}

export default Login
