import dbConnect from "@/lib/db";
import Product from "@/model/Product";
import { NextResponse } from "next/server";



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
