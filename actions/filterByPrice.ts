import prisma from "../lib/prismadb";

interface Product {
  name: string;
  price: number;
}

export const filterProducts = async (minPrice: number, maxPrice: number) => {
  try {
    const products: Product[] = await prisma.products.findMany({
      where: {
        price: {
          gte: minPrice,
          lte: maxPrice
        }
      }
    });

  } catch (error) {
    console.error("Error filtering products:", error);
  }
};
