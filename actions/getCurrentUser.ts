import prisma from "../lib/prismadb";
import { nextOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export const getCurrentUser = async () => {
  try {
    const session = await getServerSession(nextOptions);

  if (!session?.user?.email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
    include: {
      profile: true,
      vendor:true
    },
  });

  return user
  } catch (error) {
    console.log("GET_CURRENT_USER" , error) 
    return null
  }
};
