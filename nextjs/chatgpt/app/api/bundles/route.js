import Bundle from "@/app/models/Bundle"
import { NextResponse } from "next/server"

export async function GET(request) {
    const country = request.nextUrl.searchParams.get("country")
    let bundles
    if (country) {
        bundles = await Bundle.find({country:country})
    } else {
        bundles = await Bundle.find()
    }  
    return NextResponse.json({bundles})
}


export async function POST(req) {
   try {
        const body = await req.json()
        const data = body.formData
        console.log(data);
        await Bundle.create(data)
        return NextResponse.json({message: "Bundle Created"}, {status: 201})
   } catch (error) {
        console.log(error);
        return NextResponse.json({message: 'failed'}, {status: 40})
   }
}


export async function DELETE(req) {
   try {
        const id = req.nextUrl.searchParams.get("id")
        await Bundle.deleteOne({_id: id})
        return NextResponse.json({message: "Bundle Deleted"}, {status: 201})
   } catch (error) {
        console.log(error);
        return NextResponse.json({message: 'failed'}, {status: 40})
   }
}