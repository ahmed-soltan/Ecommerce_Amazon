import prisma from "../lib/prismadb";

export const getVendor = async (userId: string) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: {
        userId: userId,
      },
      include: {
        Products: true,
        categories: true
      },
    });
    return vendor;
  } catch (error) {
    console.log("GET_VENDOR : ", error);
    return null;
  }
};
