import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/utils/connect";
import {Params} from "next/dist/shared/lib/router/utils/route-matcher";
export const GET = async (req: NextRequest, {params}: Params) => {

    try {
        const messages = await prisma.messages.findMany({
            where: {
                user: params.userId,
            },
            orderBy: {
                createdAt: 'asc'
            }
        });
        return new NextResponse(
            JSON.stringify(messages),
            { status: 200 }
        )
    } catch (err) {
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong!" }),
            { status: 500 }
        )
    }
}