import { getProductById } from "@/actions/getProductById"
import prisma from '../../../../lib/prismadb'
import Container from "@/components/Container";
import SimilarProductsDetails from "./_components/SimilarProductsDetails";
const page = async({params}:{params:{productId:string}}) => {
    const product = await getProductById(params.productId);

    const similarProducts = await prisma.products.findMany({
        where: {
            category: product?.category,
            inStock: true,
            id: {
                not: product?.id
            }
        },
        include:{
            reviews:true
        },
        take: 6,
        orderBy: {
            createdAt: 'desc'
        }
    })

  return (
    <div className="py-6">
        <Container>
            <SimilarProductsDetails product={product!} similarProducts={similarProducts!}/>
        </Container>
    </div>
  )
}

export default page