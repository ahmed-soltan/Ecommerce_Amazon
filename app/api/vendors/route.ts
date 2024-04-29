import prisma from "../../../lib/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";
export const POST = async (req: Request) => {
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


    const vendor = await prisma.vendor.create({
      data: {
        ...body,
      },
    });

    await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        role:"VENDOR",
      },
    })

    return NextResponse.json(vendor);
  } catch (error) {
    console.log("REGISTER : ", error);
    return NextResponse.json(error);
  }
};
