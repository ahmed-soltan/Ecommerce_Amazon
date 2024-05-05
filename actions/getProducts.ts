import prisma from "../lib/prismadb";


export const getProducts = async () => {
  try {
    const products = await prisma.products.findMany({
      where: {
        inStock:true
      },
      include:{
        reviews:true
      },
      orderBy:{
        createdAt:"desc"
      }
    });
    return products;
  } catch (error) {
    console.log("GET_PRODCUTS", error);
    return null;
  }
};
