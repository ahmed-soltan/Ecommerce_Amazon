import prisma from "../../../../../../lib/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";
export const DELETE = async (req: Request , {params}:{params:{reviewId:string}}) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({
        error: "You must be signed in",
        status: 401,
      });
    }


    const review = await prisma.review.delete({
      where:{
        id:params.reviewId,
      }
    });

    return NextResponse.json(review);
  } catch (error) {
    console.log("REVIEW : ", error);
    return NextResponse.json(error);
  }
};