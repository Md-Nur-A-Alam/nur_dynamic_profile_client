import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
    // Wait, BetterAuth client `baseURL` should point to the server if they are separate.
    // The default is to point to the server where Better Auth is hosted.
    // If the server is on 8000, we should point there.
});

export const { signIn, signUp, signOut, useSession } = authClient;
