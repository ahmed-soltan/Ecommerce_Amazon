import prisma from "../../../../../lib/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";
export const PATCH = async (req: Request , {params}:{params:{profileId:string}}) => {
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


    const clothes = await prisma.clothingShoesPreferences.upsert({
      where:{
        profileId:params.profileId,
      },
      update: {
        ...body,
      },
      create:{
        profileId:params.profileId,
       ...body,
      }
    });

    return NextResponse.json(clothes);
  } catch (error) {
    console.log("REGISTER : ", error);
    return NextResponse.json(error);
  }
};
