import prisma from "../lib/prismadb";


export const getProfileById = async (profileId:string) => {
  try {
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
