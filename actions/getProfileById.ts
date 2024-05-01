import prisma from "../lib/prismadb";
import { getCurrentUser } from "./getCurrentUser";


export const getProfileById = async (profileId:string) => {
  try {
    const user = await getCurrentUser()
    if(!user){
      return null
    }
    const profile = await prisma.profile.findUnique({
      where: {
        id: profileId,
      },
      include: {
        clothingShoesPreferences: true,
        Interests: true,
      },
    });
    return profile;
  } catch (error) {
    console.log("GET_PROFILE", error);
    return null;
  }
};
