import { NextResponse } from "next/server";

import prisma from "../../../../../../lib/prismadb";

import { getCurrentUser } from "@/actions/getCurrentUser";

export const PATCH = async (
  req: Request,
  { params }: { params: { vendorId: string; categoryId: string } }
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({
        error: "You must be signed in",
        status: 401,
      });
    }
    const body = await req.json();

    const category = await prisma.category.update({
      where: {
        id: params.categoryId,
        vendorId: params.vendorId,
      },
      data: {
        ...body,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("VENDOR : ", error);
    return NextResponse.json(error);
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { vendorId: string; categoryId: string } }
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({
        error: "You must be signed in",
        status: 401,
      });
    }

    const category = await prisma.category.delete({
      where: {
        id: params.categoryId,
        vendorId: params.vendorId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("VENDOR : ", error);
    return NextResponse.json(error);
  }
};
