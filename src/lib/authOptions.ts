// src/lib/authOptions.ts
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from './mongodb'
import type { NextAuthOptions } from "next-auth";


export const authOptions: NextAuthOptions = {
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                try {
                    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
                    const res = await fetch(`${baseUrl}/api/auth/login`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(credentials),
                        cache: 'no-store'
                    })

                    const user = await res.json()
                    if (!res.ok || !user?.email || !user?.id) return null

                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name ?? ''
                    }
                } catch (err) {
                    console.error('[authorize()] ERROR', err)
                    return null
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.email = user.email
                token.name = user.name
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user = {
                    ...session.user,
                    id: token.sub || token.id,
                    email: token.email,
                    name: token.name
                }
            }
            return session
        }
    },
    pages: {
        signIn: '/auth/signin'
    }
}
