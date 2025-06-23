import dbConnect from "@/lib/db"
import User, { User as UserType } from "@/model/user.model"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest, { params }: { params: { userId: string } }) {
    await dbConnect()

    let body
    try {
        body = await req.json()
    } catch {
        return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 })
    }

    const { productId, quantity } = body

    const user = await User.findById(params.userId)
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 })

    const itemIndex = user.cart.findIndex((item: UserType['cart'][0]) =>
        item.productId.toString() === productId
    )

    if (itemIndex >= 0) {
        user.cart[itemIndex].quantity += quantity
    } else {
        user.cart.push({ productId, quantity })
    }

    await user.save()

    return NextResponse.json({ message: 'Cart updated', cart: user.cart }, { status: 200 })
}
