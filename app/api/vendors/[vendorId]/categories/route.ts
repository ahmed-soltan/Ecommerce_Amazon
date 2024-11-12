import { NextResponse } from "next/server";

import prisma from "../../../../../lib/prismadb";

import { getCurrentUser } from "@/actions/getCurrentUser";

export const POST = async (
  req: Request,
  { params }: { params: { vendorId: string } }
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({
        error: "You must be signed in",
        status: 401,
      });
    }
    if (!params.vendorId) {
      return NextResponse.json({
        error: "You must be signed in",
        status: 401,
      });
    }

    const body = await req.json();

    const product = await prisma.category.create({
      data: {
        ...body,
        vendorId: params.vendorId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("ADD_CATEGORY : ", error);
    return NextResponse.json(error);
  }
};
