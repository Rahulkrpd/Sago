import dbConnect from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/model/Product";


export async function POST(req: NextRequest) {
    await dbConnect()

    try {
        const { title, price, description, category, image, rating } = await req.json()


        // if (!title || !price |) {
        //     return NextResponse.json(
        //         { message: 'Title and price are required' },
        //         { status: 400 }
        //     )
        // }

        if (!title || !price || !description || !category || !image || !rating) {
            return new Response(
                JSON.stringify({ error: "All fields (title, price, description, category, image, rating) are required." }),
                { status: 400 }
            );
        }

        const newProduct = await Product.create({
            title, price, description, category, image, rating
        })

        newProduct.save()
        return NextResponse.json({
            message: "Product created",
            productId: newProduct._id
        }, {
            status: 201
        })
    } catch (error) {
        return NextResponse.json({ message: "PRODUCT_CREATE_ERROR", error }, { status: 500 })
    }


}