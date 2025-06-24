'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function RegisterPage() {
    const [form, setForm] = useState({
        firstname: '', lastname: '', email: '', password: ''
    })
    const router = useRouter()

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        })

        if (res.ok) {
            await signIn('credentials', {
                email: form.email,
                password: form.password,
                redirect: false
            })
            router.push('/home')
        } else {
            const data = await res.json()
            alert(data.error || 'Registration failed')
        }
    }

    return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-black rounded-2xl border-sky-800 border-2 shadow">
            <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
            <form onSubmit={handleRegister} className="space-y-4">
                <input className="w-full border p-2" placeholder="First Name" required
                    onChange={e => setForm({ ...form, firstname: e.target.value })} />
                <input className="w-full border p-2" placeholder="Last Name" required
                    onChange={e => setForm({ ...form, lastname: e.target.value })} />
                <input className="w-full border p-2" placeholder="Email" type="email" required
                    onChange={e => setForm({ ...form, email: e.target.value })} />
                <input className="w-full border p-2" placeholder="Password" type="password" required
                    onChange={e => setForm({ ...form, password: e.target.value })} />
                <button className="w-full bg-green-600 text-white p-2 rounded">Register</button>
            </form>
            <button onClick={() => signIn('google',{ callbackUrl: '/home' })} className="w-full mt-4 bg-red-500 text-white p-2 rounded">
                Sign up with Google
            </button>
            <p className="text-sm text-center text-gray-700 dark:text-gray-300 mt-4">
                        Already have an account?
                        <button onClick={(e) => {
                            e.preventDefault()
                            router.push('/auth/signin')
                        }} className="text-blue-500 hover:underline mx-1">Login here</button>
                    </p>
            
        </div>
    )
}
