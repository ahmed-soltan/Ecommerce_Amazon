import prisma from "../lib/prismadb";


export const getCurrentProfile = async (userId:string) => {
  try {
    const profile = await prisma.profile.findFirst({
      where: {
        userId: userId,
        isSelected:true
      },
    });
    return profile;
  } catch (error) {
    console.log("GET_CURRENT_PROFILE", error);
    return null;
  }
};
