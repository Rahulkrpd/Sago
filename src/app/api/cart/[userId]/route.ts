import dbConnect from "@/lib/db";
import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/model/Product";
import mongoose from "mongoose";



interface CartItem {
    productId: mongoose.Types.ObjectId;
    quantity: number;
}

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ userId: string }> } 
) {
    try {
        await dbConnect();


        const { userId } = await params;
        


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
        
        return NextResponse.json(
            { message: "Failed to fetch cart due to internal server error" ,error},
            { status: 500 }
        );
    }
}

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ userId: string }> }
) {
    try {
        await dbConnect();
        const { userId } = await params;
        const { productId, quantity } = await req.json();

        // Validate userId and productId
        if (!userId || typeof userId !== "string" || !userId.match(/^[0-9a-fA-F]{24}$/)) {
            return NextResponse.json(
                { message: "Invalid userId format" },
                { status: 400 }
            );
        }
        if (!productId || typeof productId !== "string" || !productId.match(/^[0-9a-fA-F]{24}$/)) {
            return NextResponse.json(
                { message: "Invalid productId format" },
                { status: 400 }
            );
        }
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }
        const product = await Product.findById(productId);
        if (!product) {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 }
            );
        }
        // Check if product is already in cart
        const cartItem = user.cart.find((item: { productId: typeof user.cart[0]["productId"]; quantity: number }) => item.productId.toString() === productId);
        if (cartItem) {
            cartItem.quantity += quantity || 1;
        } else {
            user.cart.push({ productId, quantity: quantity || 1 });
        }
        await user.save();
        await user.populate("cart.productId");
        return NextResponse.json(
            {
                message: "Product added to cart successfully",
                cart: user.cart,
            },
            { status: 200 }
        );
    } catch (error) {
        
        return NextResponse.json(
            { message: "Failed to add to cart due to internal server error",error },
            { status: 500 }
        );
    }
}


export async function PATCH(req: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
    try {
        await dbConnect();
        const { userId } = await params;
        const { productId } = await req.json();

        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const item = user.cart.find((item: CartItem) => item.productId.toString() === productId);
        if (!item) {
            return NextResponse.json({ message: "Item not in cart" }, { status: 404 });
        }

        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            user.cart = user.cart.filter((item: CartItem) => item.productId.toString() !== productId);
        }

        await user.save();


        const updatedUser = await User.findById(userId).populate("cart.productId");

        return NextResponse.json({ cart: updatedUser.cart }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Server error", error: (error as Error).message }, { status: 500 });
    }
}




