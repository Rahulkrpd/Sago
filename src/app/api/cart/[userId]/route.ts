// src/app/api/cart/[userId]/route.ts
import dbConnect from "@/lib/db";
import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ userId: string }> } // Use Promise for params
) {
    try {
        await dbConnect();

        
        const { userId } = await params;
        console.log("userId:", userId); // Debug log

        
        if (!userId || typeof userId !== "string" || !userId.match(/^[0-9a-fA-F]{24}$/)) {
            return NextResponse.json(
                { message: "Invalid userId format" },
                { status: 400 }
            );
        }

        
        const user = await User.findById(userId).populate("cart.productId");
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                message: "Cart retrieved successfully",
                cart: user.cart,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching cart:", error);
        return NextResponse.json(
            { message: "Failed to fetch cart due to internal server error" },
            { status: 500 }
        );
    }
}