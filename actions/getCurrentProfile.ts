import prisma from "../lib/prismadb";
import { getCurrentUser } from "./getCurrentUser";


export const getCurrentProfile = async (userId:string) => {

  try {
    const profile = await prisma.profile.findFirst({
      where: {
        userId: userId,
        isSelected:true
      },
      include:{
        Order:{
          orderBy:{
            createdAt:"desc"
          }
        }
      }
    });
    return profile;
  } catch (error) {
    console.log("GET_CURRENT_PROFILE", error);
    return null;
  }
};
