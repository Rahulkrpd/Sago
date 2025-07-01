'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Loading from '@/components/Loading'

export default function SignInPage() {
    const [form, setForm] = useState({ email: '', password: '' })
    const router = useRouter()
    const [loginLoading, setLoginLoading] = useState(false)
    const [googleLoading, setGoogleLoading] = useState(false)

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoginLoading(true)

        const res = await signIn('credentials', {
            redirect: false,
            email: form.email,
            password: form.password
        })

        if (res?.status === 200) {
            router.push('/home')
        } else {
            alert('Invalid credentials')
        }

        setLoginLoading(false)
    }

    const handleGoogleLogin = async () => {
        setGoogleLoading(true)
        await signIn('google', { callbackUrl: '/home' })
        // No need to setGoogleLoading(false) because it redirects
    }

    return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-black rounded-2xl border-sky-800 border-2 shadow">
            <h2 className="text-2xl font-semibold mb-4 text-center text-white">Sign In</h2>

            <form onSubmit={handleLogin} className="space-y-4">
                <input
                    className="w-full border p-2"
                    placeholder="Email"
                    type="email"
                    required
                    onChange={e => setForm({ ...form, email: e.target.value })}
                />
                <input
                    className="w-full border p-2"
                    placeholder="Password"
                    type="password"
                    required
                    onChange={e => setForm({ ...form, password: e.target.value })}
                />
                <button
                    type="submit"
                    disabled={loginLoading}
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-800 transition-colors duration-200 flex justify-center items-center gap-2"
                >
                    {loginLoading ? <Loading /> : 'Login'}
                </button>
            </form>

            <button
                onClick={handleGoogleLogin}
                disabled={googleLoading}
                className="w-full mt-4 bg-red-500 text-white p-2 rounded flex justify-center items-center gap-2"
            >
                {googleLoading ? <Loading /> : 'Sign in with Google'}
            </button>

            <p className="text-sm text-center text-gray-300 mt-4">
                Don&apos;t have an account?
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        router.push('/auth/register')
                    }}
                    className="text-blue-500 hover:underline mx-1"
                >
                    Register here
                </button>
            </p>
        </div>
    )
}
