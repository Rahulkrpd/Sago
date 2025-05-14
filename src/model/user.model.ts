import mongoose, { Schema, Document } from "mongoose"


export interface User extends Document {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
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
    password: {
        type: String,
        required: true,
    }

})

const User = mongoose.models.User || mongoose.model<User>("User", userSchema)

export default User