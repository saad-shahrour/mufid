import User from "@/app/models/User";
import {NextResponse} from "next/server"

export async function GET(request) {
    const email = request.nextUrl.searchParams.get("email")
    const user = await User.findOne({email: email})
    return NextResponse.json({user})
}