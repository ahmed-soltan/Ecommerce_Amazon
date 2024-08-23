import prisma from "../../../../../lib/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";
export const PATCH = async (
  req: Request,
  { params }: { params: { profileId: string } }
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

    const reviews = await prisma.review.upsert({
      where: {
        productId_profileId: {
          productId: body.productId,
          profileId: params.profileId,
        },
      },
      update: {
        ...body
      },
      create: {
        profileId: params.profileId,
        productId: body.productId,
        comment: body.comment,
        rating: body.rating
      },
    });
    
      
    return NextResponse.json(reviews);
  } catch (error) {
    console.log("REGISTER : ", error);
    return NextResponse.json(error);
  }
};
