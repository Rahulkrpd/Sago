// src/lib/authOptions.ts
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "./mongodb";
import type { NextAuthOptions } from "next-auth";
import User from "@/model/user.model";
import mongoose from "mongoose";
import type { Profile as NextAuthProfile } from "next-auth";

// Extend the Profile type for Google
interface GoogleProfile extends NextAuthProfile {
    given_name?: string;
    family_name?: string;
}

export const authOptions: NextAuthOptions = {
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
                    const res = await fetch(`${baseUrl}/api/auth/login`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(credentials),
                        cache: "no-store",
                    });

                    const user = await res.json();
                    if (!res.ok || !user?.email || !user?.id) return null;

                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name ?? "",
                    };
                } catch (err) {
                    console.error("[authorize()] ERROR", err);
                    return null;
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === "google") {
                try {
                    await mongoose.connect(process.env.MONGODB_URI as string);
                    let dbUser = await User.findOne({ email: user.email });

                    const googleProfile = profile as GoogleProfile;

                    if (!dbUser) {
                        // Create new user for Google login
                        dbUser = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: user.email,
                            firstname: googleProfile?.given_name || "Google",
                            lastname: googleProfile?.family_name || "User",
                            password: null, // Google users don't have passwords
                            cart: [],
                        });
                        await dbUser.save();
                    } else {
                        // Link Google account if email exists (handle OAuthAccountNotLinked)
                        if (!dbUser.googleId) {
                            dbUser.googleId = account.providerAccountId;
                            await dbUser.save();
                        }
                    }

                    // Set user.id for session
                    user.id = dbUser._id.toString();
                    return true;
                } catch (err) {
                    console.error("Google signIn error:", err);
                    return "/auth/signin?error=AccountLinkFailed";
                }
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user = {
                    ...session.user,
                    id: (token.id || token.sub) as string,
                    email: token.email ?? null,
                    name: token.name ?? null,
                };
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            // Redirect to /home after successful login
            if (url.includes("/auth/signin")) {
                return `${baseUrl}/home`;
            }
            return url;
        },
    },
    pages: {
        signIn: "/auth/signin",

    },
};