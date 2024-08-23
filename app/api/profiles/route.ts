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

    const profile = await prisma.profile.create({
      data: {
        ...body,
      },
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.log("PROFILE : ", error);
    return NextResponse.json(error);
  }
};
