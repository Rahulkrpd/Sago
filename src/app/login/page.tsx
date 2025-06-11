'use client'
import React, { useState } from "react";
import { Label } from "../../components/ui/label"
import { Input } from "../../components/ui/input"
import { cn } from "@/lib/utils";
import {

    IconBrandGoogle,

} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";








const Login = () => {
    const [isloading, setLoading] = useState(false)
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        const form = new FormData(e.currentTarget);
        const obj = Object.fromEntries(form.entries());

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.error || 'Something went wrong');
            }
            if (result?.success) {
                router.push('/home');
            }


        } catch (error) {
            console.log(error)

        }

    }


    return (

        <div className=" border-2 border-sky-500 mt-20 shadow-input mx-auto w-full max-w-md rounded-2xl bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
            <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
                Welcome to Sago
            </h2>


            <form className="my-8" onSubmit={handleSubmit}>

                <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" name="email" placeholder="projectmayhem@fc.com" type="email" />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" placeholder="••••••••" type="password" />
                </LabelInputContainer>




                <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
                {isloading ? (
                    <button
                        disabled
                        className="group/btn relative h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]  mb-3 flex justify-center items-center"
                        type="button"
                    >
                        <span className="mx-1">Logging in...</span>
                        <Loading />
                        <BottomGradient />
                    </button>
                ) : (
                    <button
                        className="group/btn relative h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]  flex justify-center items-center mb-3"
                        type="submit"
                    >
                        Signin &rarr;
                        <BottomGradient />
                    </button>
                )}

                <div className="flex flex-col space-y-4">

                    <button
                        className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
                        type="submit"
                    >
                        <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                        <span className="text-sm text-neutral-700 dark:text-neutral-300">
                            Google
                        </span>
                        <BottomGradient />
                    </button>

                    <p className="text-sm text-center text-gray-700 dark:text-gray-300 mt-4">
                        Don&apos;t have an account?
                        <button onClick={(e) => {
                            e.preventDefault()
                            router.push('/register')
                        }} className="text-blue-500 hover:underline mx-1">Register here</button>
                    </p>

                </div>
            </form>
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
            <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex w-full flex-col space-y-2", className)}>
            {children}
        </div>
    );
};

export default Login;