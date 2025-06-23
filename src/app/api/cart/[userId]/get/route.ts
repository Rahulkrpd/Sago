// src/app/api/cart/[userId]/get/route.ts
import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import User from '@/model/user.model'

export async function GET(req: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
    await dbConnect()
    const { userId } = await params
    const user = await User.findById(userId).populate('cart.productId')

    if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 })

    return NextResponse.json({ cart: user.cart }, { status: 200 })
}
