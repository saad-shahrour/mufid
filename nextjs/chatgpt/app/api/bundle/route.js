import Bundle from "@/app/models/Bundle";
import {NextResponse} from "next/server"

export async function GET(request) {
    const id = request.nextUrl.searchParams.get("id")
    console.log(id);
    const user = await Bundle.findOne({_id: id})
    return NextResponse.json({user})
}