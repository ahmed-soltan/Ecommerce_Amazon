import prisma from "../../../../../lib/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";
export const PATCH = async (req: Request , {params}:{params:{customerId:string}}) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({
        error: "You must be signed in",
        status: 401,
      });
    }
    const body = await req.json();
    console.log(body)


    const user = await prisma.user.update({
      where:{
        id:params.customerId,
      },
      data: {
        ...body,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("ORDER : ", error);
    return NextResponse.json(error);
  }
};