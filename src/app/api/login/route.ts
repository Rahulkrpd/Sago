import dbConnect from "@/lib/db";
import User from "@/model/user.model";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { email, password } = await request.json();

        const normalizedEmail = email.toLowerCase().trim();
        const existUser = await User.findOne({ email: normalizedEmail });

        if (!existUser) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User does not exist",
                },
                { status: 404 }
            );
        }

        const isValidUser = await bcrypt.compare(password, existUser.password);

        if (!isValidUser) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Password is incorrect",
                },
                { status: 401 } 
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "User logged in successfully.",
                user: {
                    id: existUser._id,
                    firstname: existUser.firstname,
                    lastname: existUser.lastname,
                    email: existUser.email,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Error in login route",
                error,
            },
            { status: 500 }
        );
    }
}
