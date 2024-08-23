import prisma from "../../../../../../lib/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";
export const PATCH = async (req: Request , {params}:{params:{vendorId:string , productId:string}}) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({
        error: "You must be signed in",
        status: 401,
      });
    }
    const body = await req.json();


    const product = await prisma.products.update({
      where:{
        id:params.productId,
        vendorId:params.vendorId,
      },
      data: {
        ...body,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("VENDOR : ", error);
    return NextResponse.json(error);
  }
};

export const DELETE = async (req: Request , {params}:{params:{vendorId:string , productId:string}}) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({
        error: "You must be signed in",
        status: 401,
      });
    }

    const product = await prisma.products.delete({
      where:{
        id:params.productId,
        vendorId:params.vendorId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("VENDOR : ", error);
    return NextResponse.json(error);
  }
};

