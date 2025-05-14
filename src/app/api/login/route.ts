import dbConnect from "@/lib/db";
import User from "@/model/user.model";
import bcrypt from "bcrypt"



export async function POST(request: Request) {
    await dbConnect()

    try {
        const { firstname, lastname, email, password } = await request.json()

        const existUser = await User.findOne({
            firstname,
            email
        })

        if (existUser) {
            return Response.json({ sucess: false, message: "User already  exist" })
        }

        const hashPasword = await bcrypt.hash(password, 10)

        const newUser = new User({
            firstname,
            lastname,
            email,
            password: hashPasword,

        })

        await newUser.save()


        return Response.json({
            success: true,
            message: "User registered successfully. Please verify your email"
        }, {
            status: 201
        })

    } catch (error) {
        console.log(error)
        return Response.json(
            {
                success: false,
                messaga: "Error in sign-up route"
            }, {
            status: 500
        }
        )

    }
}