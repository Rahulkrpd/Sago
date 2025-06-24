import dbConnect from "@/lib/db";
import ProductModel from "@/model/Product";
import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/context/StoreContext";

export async function POST(req: NextRequest, { params }: { params: { userId: string } }) {
    try {
        // Connect to the database
        await dbConnect();

        // Get userId from params (await required)
        const userId = params.userId

        // Parse request body
        const { productId } = await req.json();

        // Validate inputs
        if (!userId || !productId) {
            return NextResponse.json(
                { message: "userId and productId are required" },
                { status: 400 }
            );
        }

        // Find user
        const userExist = await User.findById(userId);
        if (!userExist) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        // Find product
        const productExist = await ProductModel.findById(productId);
        if (!productExist) {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 }
            );
        }

        // Remove product from cart (compare _id as strings)
        userExist.cart = userExist.cart.filter(
            (item: Product) => item._id.toString() !== productId
        );

        // Save updated user
        await userExist.save();

        return NextResponse.json(
            {
                message: "Product removed from cart",
                cart: userExist.cart,
            },
            { status: 200 }
        );
    } catch (error) {
        // Log error for debugging
        console.error("Error removing product from cart:", error);

        return NextResponse.json(
            { message: "Failed to remove product due to internal server error" },
            { status: 500 }
        );
    }
}