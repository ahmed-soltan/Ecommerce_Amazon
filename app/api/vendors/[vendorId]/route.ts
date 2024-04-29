import prisma from "../../../../lib/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";
export const PATCH = async (req: Request , {params}:{params:{vendorId:string}}) => {
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


    const vendor = await prisma.vendor.update({
      where:{
        id:params.vendorId,
      },
      data: {
        ...body,
      },
    });

    return NextResponse.json(vendor);
  } catch (error) {
    console.log("VENDOR : ", error);
    return NextResponse.json(error);
  }
};

