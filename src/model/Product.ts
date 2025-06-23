import mongoose, { Schema, Document } from "mongoose";

export interface ProductDocumnet extends Document {
    title: string,
    description: string,
    price: number,
    image: string,
    category: string,
    rating: {
        rate: number
        count: number
    }

}


const ProductSchema = new Schema<ProductDocumnet>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    image: { type: String },
    category: { type: String },
    rating: {
        rate: { type: Number, default: 0 },
        count: { type: Number, default: 0 }
    }
})


export default mongoose.models.Product || mongoose.model<ProductDocumnet>('Product', ProductSchema)