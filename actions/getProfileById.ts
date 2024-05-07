import prisma from "../lib/prismadb";
import { getCurrentUser } from "./getCurrentUser";

export const getProfileById = async (profileId: string) => {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }
  try {
    const profile = await prisma.profile.findUnique({
      where: {
        id: profileId,
      },
      include: {
        clothingShoesPreferences: true,
        Interests: true,
        Order: {
          orderBy: {
            createdAt: "desc",
          },
        },
        Review: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    return profile;
  } catch (error) {
    console.log("GET_PROFILE", error);
    return null;
  }
};
