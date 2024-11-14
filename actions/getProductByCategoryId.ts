import prisma from "../lib/prismadb";


export const getProductByCategoryId = async (categoryId:string) => {

  try {
    const product = await prisma.products.findMany({
      where: {
        categoryId,
        inStock: true
      },
      include: {
        reviews: {
          orderBy:{
            createdAt: "desc",
          }
        },
      },
      orderBy: {
        name: "desc",
      },
    });
    return product;
  } catch (error) {
    console.log("GET_PRODUCT_BY_ID", error);
    return null;
  }
};
