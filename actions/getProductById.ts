import prisma from "../lib/prismadb";


export const getProductById = async (productId:string , vendorId:string) => {
  if(!productId || !vendorId){
    return null;
  }
  try {
    const product = await prisma.products.findUnique({
      where: {
        id: productId,
        vendorId: vendorId,
      },

      include: {
        reviews: true,
      },
      
    });
    return product;
  } catch (error) {
    console.log("GET_PROFILE", error);
    return null;
  }
};
