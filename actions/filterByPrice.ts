import prisma from "../lib/prismadb";

interface Product {
  name: string;
  price: number;
  // Other product fields...
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

    console.log(products);
    // Do something with the filtered products
  } catch (error) {
    console.error("Error filtering products:", error);
  }
};
