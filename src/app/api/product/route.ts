import dbConnect from "@/lib/db";
import Product from "@/model/Product";
import { NextRequest, NextResponse } from "next/server";



export async function GET() {

    await dbConnect()

    try {

        const data = await Product.find({})

        if (data) {
            return NextResponse.json({ "message": "Product data", data }, { status: 200 })
        }
    } catch (error) {

        return NextResponse.json({ message: "Failed to load data", error }, { status: 404 })
    }
}






export async function POST(req: NextRequest) {
    await dbConnect()

    try {
        const { title, price, description, category, image, rating } = await req.json()



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