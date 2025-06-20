import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import dbConnect from '@/lib/db'
import User from '@/model/user.model'

export async function POST(req: NextRequest) {
    await dbConnect()
    const { firstname, lastname, email, password } = await req.json()

    console.log(firstname)

    if (!firstname || !lastname || !email || !password)
        return NextResponse.json({ error: 'All fields are required' }, { status: 400 })

    const existing = await User.findOne({ email })
    if (existing) return NextResponse.json({ error: 'Email already registered' }, { status: 400 })

    const hashed = await bcrypt.hash(password, 12)
    const user = await User.create({
        firstname,
        lastname,
        email,
        password: hashed
    })

    return NextResponse.json({ user })
}
