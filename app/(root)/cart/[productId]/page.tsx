import { getProductById } from "@/actions/getProductById";
import prisma from "../../../../lib/prismadb";
import Container from "@/components/Container";
import SimilarProductsDetails from "./_components/SimilarProductsDetails";
import { getCategoryById } from "@/actions/getCategoryById";

const page = async ({ params }: { params: { productId: string } }) => {
  const product = await getProductById(params.productId);

  const similarProducts = await prisma.products.findMany({
    where: {
      categoryId: product?.categoryId,
      inStock: true,
      id: {
        not: product?.id,
      },
    },
    include: {
      reviews: true,
    },
    take: 6,
    orderBy: {
      createdAt: "desc",
    },
  });

  if(!product){
    return null;
  }

  const category = await getCategoryById(product?.categoryId);

  return (
    <div className="py-6">
      <Container>
        <SimilarProductsDetails
          product={product!}
          similarProducts={similarProducts!}
          category={category!}
        />
      </Container>
    </div>
  );
};

export default page;
