import prisma from "../../../../lib/prismadb";
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


    const profile = await prisma.profile.update({
      where:{
        id:params.profileId,
      },
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
export const PUT = async (req: Request, { params }: { params: { profileId: string } }) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({
        error: "You must be signed in",
        status: 401,
      });
    }

    const body = await req.json();
    console.log(body);
    const { isSelected } = body;

    // Update the currently selected profile to unselect it
    await prisma.profile.updateMany({
      where: {
        NOT: {
          id: params.profileId,
        },
      },
      data: {
        isSelected: false,
      },
    });

    // Update the newly selected profile to mark it as selected
    const profile = await prisma.profile.update({
      where: {
        id: params.profileId,
      },
      data: {
        isSelected: isSelected,
      },
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.log("REGISTER : ", error);
    return NextResponse.json(error);
  }
};
export const DELETE = async (req: Request, { params }: { params: { profileId: string } }) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({
        error: "You must be signed in",
        status: 401,
      });
    }


    // Update the newly selected profile to mark it as selected
    const profile = await prisma.profile.delete({
      where: {
        id: params.profileId,
      },
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.log("REGISTER : ", error);
    return NextResponse.json(error);
  }
};
