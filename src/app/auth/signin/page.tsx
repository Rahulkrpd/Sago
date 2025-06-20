'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function SignInPage() {
    const [form, setForm] = useState({ email: '', password: '' })
    const router = useRouter()

    const handleLogin = async (e: any) => {
        e.preventDefault()
        const res = await signIn('credentials', {
            redirect: false,
            email: form.email,
            password: form.password
        })

        console.log('frontend result  signIn result:', res)

        if (res?.status == 200) {

            router.push('/home') // or '/'

        } else {
            alert('Invalid credentials')
        }
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
                <button className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
            </form>
            <button
                onClick={() => signIn('google',{ callbackUrl: '/home' })}
                className="w-full mt-4 bg-red-500 text-white p-2 rounded"
            >
                Sign in with Google
            </button>
        </div>
    )
}
