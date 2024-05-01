import prisma from "../lib/prismadb";
import { getCurrentUser } from "./getCurrentUser";


export const getCurrentProfile = async () => {
  const user = await getCurrentUser();

  if(!user){
    return null
  }
  try {
    const profile = await prisma.profile.findFirst({
      where: {
        userId: user.id,
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
