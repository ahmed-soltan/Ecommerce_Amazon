import bcrypt from "bcrypt";
import prisma from "../../../../lib/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    if (!body.email || !body.username || !body.password) {
      throw new Error("Enter the a Valid Data");
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const userExist = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (userExist) {
      throw new Error("Email Already Exist");
    }
let user
    if (body.email === "admin@admin.com") {
       user = await prisma.user.create({
        data: {
          username: body.username,
          email: body.email,
          hashedPassword: hashedPassword,
          role: "ADMIN",
        },
      });
    } else {
       user = await prisma.user.create({
        data: {
          username: body.username,
          email: body.email,
          hashedPassword: hashedPassword,
        },
      });
    }

    if (!user.username) {
      throw new Error("User Not Found");
    }

    const profile = await prisma.profile.create({
      data: {
        userId: user.id,
        name: user.username,
        isSelected: true,
        isHolderAccount: true,
      },
    });


    return NextResponse.json(user);
  } catch (error) {
    console.log("REGISTER : ", error);
    return new NextResponse("INTERAL ERROR", {
      status: 500,
    });
  }
};
