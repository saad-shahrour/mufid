import { getServerSession } from "next-auth";
import {NextResponse} from "next/server"
import { options } from "../auth/[...nextauth]/options";
import User from "@/app/models/User";


export async function POST(req,res) {
    try {

        const session = await getServerSession(options)

        const body = await req.json()
        const userData = body.formData

        if (!userData) {
            return NextResponse.json({message: "no data"}, {status: 400})
        }

        console.log("session", session);
        const email = await session?.user?.email
        const role = await session?.user?.role
        // const bundle = {
        //     messages: 2,
        //     time: Date.now(),
        //     used: false
        // }
        // const payed = true
        // bundle, payed

        const fullData = {...userData, email, role}
        
        setTimeout(async () => {
            await User.create(fullData)
        }, 1)
        
        
        return NextResponse.json({message: "User Created"}, {status: 201})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "failed"}, {status: 400})
    }
}

export async function GET() {
    const users = await User.find().populate('boughtBundle')
    return NextResponse.json({users})
}


export async function PATCH(req, {params}) {
    console.log('params', params);
    try {
        
        const body = await req.json()
        const {boughtBundle, userId} = body
        const filter = { _id: userId };  // Specify the filter criteria
        const update = { $set: { boughtBundle: boughtBundle} }
        await User.updateOne(filter, update);

        return NextResponse.json({message: "Bundle is Added"}, {status: 201})

    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "failed"}, {status: 400})
    }
}