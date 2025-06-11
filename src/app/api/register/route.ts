import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/model/user.model";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { firstname, lastname, email, password } = await request.json();

        // Check if user already exists by email
        const normalizedEmail = email.toLowerCase().trim();
        const existUser = await User.findOne({ email: normalizedEmail });
        // then save with email: normalizedEmail
        

        if (existUser) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User already exists",
                },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            firstname,
            lastname,
            email:normalizedEmail,
            password: hashedPassword,
        });

        await newUser.save();

        return NextResponse.json(
            {
                success: true,
                message: "User registered successfully.",
            },
            { status: 201 }
        );
    } catch (error) {
        // console.error("Signup Error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Error in sign-up route",error,
            },
            { status: 500 }
        );
    }
}
