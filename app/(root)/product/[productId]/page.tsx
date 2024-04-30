import { getProductById } from "@/actions/getProductById";
import Container from "@/components/Container";
import ProductContainerDetails from "./_components/ProductContainerDetails";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getProductByCategoryId } from "@/actions/getProductByCategoryId";
import { redirect } from "next/navigation";
import ProductCard from "@/components/ProductCard";

const page = async ({ params }: { params: { productId: string } }) => {
  const product = await getProductById(params.productId);
  if(!product){
    return null;
  }
  const products = await getProductByCategoryId(product?.category)
  const relatedProducts = products?.filter(product => product.id === product.id).slice(0,12)
  const relatedProductsLength = relatedProducts?.length || 0
  const user = await getCurrentUser();
  if (!user) {
    return redirect('/login');
  }
  return (
    <div className="py-6">
      <Container>
        <div className="flex flex-col items-start gap-y-10">

        <ProductContainerDetails product={product} user={user}/>
        {
          relatedProductsLength>0 && (
            <div className="bg-white p-2 rounded-md">
              <h2 className="text-3xl text-slate-800 my-3">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {relatedProducts?.map((product) => (
                  <div key={product.id}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          )
        }
        </div>
      </Container>
    </div>
  );
};

export default page;
