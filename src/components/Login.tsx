import React, { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

function Login() {
    const { data: session } = useSession();

    if (session) {
        return (
            <div className="flex flex-row gap-3 items-center">
                <p>Welcome, {session.user?.email}</p>
                <button
                    className="bg-white px-10 py-2 rounded-xl font-semibold text-black text-md hover:bg-yellow-400 transition-all duration-200 ease-out"
                    onClick={() => signOut()}
                >
                    Sign out
                </button>
            </div>
        );
    } else {
        return (
            <div>
                <button
                    className="bg-white px-10 py-2 rounded-xl font-semibold text-black text-md hover:bg-yellow-400 transition-all duration-200 ease-out"
                    onClick={() => signIn()}
                >
                    Sign in
                </button>
            </div>
        );
    }
}

export default Login;
