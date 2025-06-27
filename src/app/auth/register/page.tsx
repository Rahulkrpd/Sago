'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import Loading from '@/components/Loading';

export default function RegisterPage() {
    const [form, setForm] = useState({
        firstname: '', lastname: '', email: '', password: ''
    });

    const router = useRouter();
    const [formLoading, setFormLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormLoading(true);

        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });

        if (res.ok) {
            await signIn('credentials', {
                email: form.email,
                password: form.password,
                redirect: false
            });
            setFormLoading(false);
            router.push('/home');
        } else {
            setFormLoading(false);
            const data = await res.json();
            alert(data.error || 'Registration failed');
        }
    };

    const handleGoogleSignIn = async () => {
        setGoogleLoading(true);
        await signIn('google', { callbackUrl: '/home' });
    };

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

                <button
                    type="submit"
                    disabled={formLoading}
                    className="w-full flex justify-center items-center gap-2 bg-green-600 text-white p-2 rounded hover:font-bold"
                >
                    {formLoading ? <Loading /> : 'Register'}
                </button>
            </form>

            <button
                onClick={handleGoogleSignIn}
                disabled={googleLoading}
                className="w-full mt-4 flex justify-center items-center gap-2 bg-red-500 text-white p-2 rounded hover:font-bold"
            >
                {googleLoading ? <Loading /> : 'Sign up with Google'}
            </button>

            <p className="text-sm text-center text-gray-300 mt-4">
                Already have an account?
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        router.push('/auth/signin');
                    }}
                    className="text-blue-500 hover:underline mx-1"
                >
                    Login here
                </button>
            </p>
        </div>
    );
}
