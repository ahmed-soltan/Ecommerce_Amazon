import prisma from "../lib/prismadb";

export const getCategories = async () => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        products: {
          where: {
            inStock: true,
          },
          select: {
            id: true,
          },
        },
      },
    });

    return categories;
  } catch (error) {
    console.log("GET_CATEGORIES", error);
    return null;
  }
};
