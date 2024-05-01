import prisma from "../lib/prismadb";


export const getOrderById = async (orderId:string ) => {
  if(!orderId ){
    return null;
  }
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });
    return order;
  } catch (error) {
    console.log("GET_PRODUCT_BY_ID", error);
    return null;
  }
};
