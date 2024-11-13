import prisma from "../lib/prismadb";

export const getCategoriesWithProductCount = async () => {
  try {
    const categoriesWithProductCount = await prisma.category.findMany({
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

    const filteredCategories = categoriesWithProductCount
      .filter(category => category.products.length > 0)
      .map(category => ({
        ...category,
        productCount: category.products.length,
      }));

    return filteredCategories;
  } catch (error) {
    console.log("GET_CATEGORIES", error);
    return null;
  }
};
