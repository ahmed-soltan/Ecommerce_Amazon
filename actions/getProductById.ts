import prisma from "../lib/prismadb";

export const getProductById = async (productId: string, vendorId?: string) => {
  if (!productId) {
    return null;
  }
  try {
    const product = await prisma.products.findUnique({
      where: {
        id: productId,
        vendorId: vendorId,
      },
      include: {
        reviews: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    const category = await prisma.category.findUnique({
      where: {
        id: product?.categoryId,
      },
      select:{
        name:true
      }
    });

    return { ...product, category: category };
  } catch (error) {
    console.log("GET_PRODUCT_BY_ID", error);
    return null;
  }
};
