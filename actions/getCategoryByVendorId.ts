import prisma from "../lib/prismadb";

export const getCategoriesByVendorId = async (vendorId: string) => {
  if (!vendorId) {
    return null;
  }
  try {
    const categories = await prisma.category.findMany({
      where: {
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

    const filteredCategories = categories.map((category) => ({
      ...category,
      productCount: category.products.length,
    }));
    
    return filteredCategories;
  } catch (error) {
    console.log("GET_category_BY_VENDOR_ID", error);
    return null;
  }
};
