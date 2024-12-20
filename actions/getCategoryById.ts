import prisma from "../lib/prismadb";

export const getCategoryById = async (
  categoryId: string,
  vendorId?: string
) => {
  if (!categoryId) {
    return null;
  }
  try {
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
        vendorId: vendorId,
      },
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

    return category;
  } catch (error) {
    console.log("GET_category_BY_ID", error);
    return null;
  }
};
