import mongoose, { Schema, Document } from "mongoose"

export interface User extends Document {
    firstname: string
    lastname: string
    email: string
    password: string
    cart: {
        productId: mongoose.Types.ObjectId
        quantity: number
    }[]
}

const userSchema: Schema<User> = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    cart: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            },
        },
    ],
}, { timestamps: true })

const User = mongoose.models.User || mongoose.model<User>('User', userSchema)

export default User
