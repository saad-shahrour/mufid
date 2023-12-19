import Opinion from "@/app/models/Opinion";
const { ObjectId } = require('mongoose').Types;
import {NextResponse} from "next/server"

export async function GET() {
    const opinions = await Opinion.find()
    return NextResponse.json({opinions})
}

// export async function PUT(request) {
//     const body = await request.json()
//     console.log(body);
//     await FreeMessage.updateOne({_id: new ObjectId("657defcba24ffe1949193c77")}, {$set: { number: body.number }})
//     return NextResponse.json({message: "free messages allowed is updated"})
// }