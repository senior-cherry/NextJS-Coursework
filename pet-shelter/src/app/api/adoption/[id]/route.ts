import {NextRequest, NextResponse} from "next/server";
import {Params} from "next/dist/shared/lib/router/utils/route-matcher";
import {prisma} from "@/utils/connect";

export const PATCH = async (req: NextRequest, { params }: Params) => {
    const id = params.id;

    try {
        const body = await req.json();
        const adoptionRequest = await prisma.adoption.update({
            where: {id},
            data: {
                isAccepted: body
            }
        });
        return new NextResponse(JSON.stringify(adoptionRequest), { status: 201 })
    } catch (err) {
        return new NextResponse(JSON.stringify({ message: "Something went wrong!" }), { status: 500 })
    }
}

