import prisma from "../lib/prismadb";
import { getCurrentUser } from "./getCurrentUser";

export const getVendorById = async (vendorId: string) => {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }
  try {
    const vendor = await prisma.vendor.findUnique({
      where: {
        id: vendorId,
      },
      include: {
        Products:{
            orderBy:{
                createdAt:"desc"
            }
        }
      },
    });
    return vendor;
  } catch (error) {
    console.log("GET_PROFILE", error);
    return null;
  }
};
