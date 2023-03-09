import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

function Login() {
    const { data: session } = useSession();

    if (session) {
        return (
            <div>
                <p>Welcome, {session.user?.email}</p>
                <button onClick={() => signOut()}>Sign out</button>
            </div>
        );
    } else {
        return (
            <div>
                <button
                    className="px-6 py-1 rounded-md text-md hover:text-yellow-300"
                    onClick={() => signIn()}
                >
                    Sign in
                </button>
            </div>
        );
    }
}

export default Login;
