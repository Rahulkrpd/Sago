import dbConnect from "@/lib/db";
import Product from "@/model/Product";
import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";


interface CartItem {
    productId: mongoose.Types.ObjectId;
    quantity: number;
}

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ userId: string }> } // Use Promise for params
) {
    try {
        await dbConnect();


        const { userId } = await params;

        const { productId } = await req.json();

        if (!userId || !productId) {
            return NextResponse.json(
                { message: "userId and productId are required" },
                { status: 400 }
            );
        }

        const userExist = await User.findById(userId);
        if (!userExist) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }


        const productExist = await Product.findById(productId);
        if (!productExist) {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 }
            );
        }


        userExist.cart = userExist.cart = userExist.cart.filter((item: CartItem) => item.productId.toString() !== productId);


        await userExist.save();

        const updatedUser = await User.findById(userId).populate("cart.productId");


        return NextResponse.json(
            {
                message: "Product removed from cart",
                cart: updatedUser.cart,
            },
            { status: 200 }
        );
    } catch (error) {

        

        return NextResponse.json(
            { message: "Failed to remove product due to internal server error",error },
            { status: 500 }
        );
    }
}