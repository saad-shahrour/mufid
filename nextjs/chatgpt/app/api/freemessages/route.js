import FreeMessage from "@/app/models/FreeMessage";
const { ObjectId } = require('mongoose').Types;
import {NextResponse} from "next/server"

export async function GET() {
    const freeMessagesNumber = await FreeMessage.findOne({_id: new ObjectId("657defcba24ffe1949193c77")})
    return NextResponse.json({freeMessagesNumber: freeMessagesNumber.number})
}

export async function PUT(request) {
    const body = await request.json()
    console.log(body);
    await FreeMessage.updateOne({_id: new ObjectId("657defcba24ffe1949193c77")}, {$set: { number: body.number }})
    return NextResponse.json({message: "free messages allowed is updated"})
}