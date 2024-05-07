import prisma from "../lib/prismadb";
import { getCurrentUser } from "./getCurrentUser";


export const getCustomerById = async (customerId:string) => {
  
  try {
    const customer = await prisma.user.findUnique({
      where: {
        id: customerId,
      },
      include: {
        profile:{
            include:{
                Order:{
                    orderBy:{
                        createdAt:"desc"
                    }
                },
                Review:{
                    orderBy:{
                        createdAt:"desc"
                    }
                },
            }
        }
      },
    });
    return customer;
  } catch (error) {
    console.log("GET_CUSTOMER", error);
    return null;
  }
};
