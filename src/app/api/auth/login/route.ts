import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import dbConnect from '@/lib/db'
import User from '@/model/user.model'

export async function POST(req: NextRequest) {
    await dbConnect()
    const { email, password } = await req.json()

    const user = await User.findOne({ email })
    if (!user || !user.password) return NextResponse.json(null, { status: 401 })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return NextResponse.json(null, { status: 401 })

    return NextResponse.json({
        id: user._id.toString(),
        email: user.email,
        name: `${user.firstname} ${user.lastname}`
    })
}
