import dbConnect from "@/lib/db";
import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ userId: string }> } // id, not userId; string, not number
) {
    try {
        await dbConnect();

        const { userId } = await params;
        
        const existUser = await User.findById(userId);

        if (!existUser) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        existUser.cart = []; // Clear the cart
        await existUser.save();

        return NextResponse.json(
            {
                message: "Cart cleared successfully",
                cart: existUser.Cart
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to clear cart", error },
            { status: 500 }
        );
    }
}
