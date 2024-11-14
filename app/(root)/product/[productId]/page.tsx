import { getProductById } from "@/actions/getProductById";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getProductByCategoryId } from "@/actions/getProductByCategoryId";
import { getCurrentProfile } from "@/actions/getCurrentProfile";
import { Separator } from "@/components/ui/separator";
import ProductCard from "@/components/ProductCard";
import ListRating from "./_components/Reviews/ListRating";
import AddRating from "./_components/Reviews/AddRating";
import prisma from "../../../../lib/prismadb";
import RatingComponent from "./_components/Reviews/Rating";
import Container from "@/components/Container";
import ProductContainerDetails from "./_components/ProductContainerDetails";
import { getCategoryById } from "@/actions/getCategoryById";

const page = async ({ params }: { params: { productId: string } }) => {
  const profiles = await prisma.profile.findMany();
  const product = await getProductById(params.productId);
  const profile = await getCurrentProfile();
  const user = await getCurrentUser();

  if (!product) {
    return null;
  }

  const products = await getProductByCategoryId(product?.categoryId);
  const category = await getCategoryById(product?.categoryId);

  const relatedProducts = products
    ?.filter((product) => product.id === product.id)
    .slice(0, 12);
  const relatedProductsLength = relatedProducts?.length || 0;

  return (
    <div className="py-6 bg-white">
      <Container>
        <div className="flex flex-col items-start gap-y-10">
          <ProductContainerDetails product={product} category={category!} />
          {relatedProductsLength > 0 && (
            <div className="bg-white p-2 rounded-md w-full">
              <h2 className="text-2xl font-semibold text-slate-800 my-3 text-center md:text-left w-full">
                Related Products
              </h2>
              <div className="flex flex-wrap items-center md:items-start justify-center md:justify-start gap-4">
                {relatedProducts?.map((product) => (
                  <div key={product.id}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          )}
          <Separator className="h-[1px] bg-slate-600" />
          <div className="rounded-md p-4 grid grid-cols-1 lg:grid-cols-6 gap-4 w-full">
            <div className="flex flex-col items-start gap-2 p-2 lg:p-4 col-span-12 md:col-span-2 w-full lg:border-r-[1px]">
              <RatingComponent reviews={product.reviews} />
              <AddRating profile={profile} product={product} user={user} />
            </div>
            {product.reviews.length > 0 ? (
              <ListRating
                product={product}
                profiles={profiles}
                profileId={profile?.id}
              />
            ) : (
              <h1 className="italic text-slate-700 w-full">
                No Review on This Product
              </h1>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default page;
