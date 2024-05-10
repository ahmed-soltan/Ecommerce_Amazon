import prisma from "../lib/prismadb";

interface SearchProps {
  key?: string;
  page?: number;
  pageSize?: number;
}

export const getFilteredProducts = async ({
  key,
  page = 1,
  pageSize = 12,
}: SearchProps) => {
  try {
    let products;
    if (key) {
      products = await prisma.products.findMany({
        where: {
          OR: [
            { name: { contains: key, mode: "insensitive" } },
            { description: { contains: key, mode: "insensitive" } },
            { category: { contains: key, mode: "insensitive" } },
            { brand: { contains: key, mode: "insensitive" } },
          ],
        },
        include: {
          reviews: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      });
    } else {
      // If no key is provided, fetch all products
      products = await prisma.products.findMany({
        include: {
          reviews: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      });
    }
    return products;
  } catch (error) {
    console.log("GET_PRODUCTS", error);
    return null;
  }
};
