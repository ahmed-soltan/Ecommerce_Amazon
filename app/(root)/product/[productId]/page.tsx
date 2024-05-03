import { getProductById } from "@/actions/getProductById";
import Container from "@/components/Container";
import ProductContainerDetails from "./_components/ProductContainerDetails";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getProductByCategoryId } from "@/actions/getProductByCategoryId";
import { redirect } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { getCurrentProfile } from "@/actions/getCurrentProfile";
import ListRating from "./_components/ListRating";
import AddRating from "./_components/AddRating";
import prisma from "../../../../lib/prismadb";
import RatingComponent from "./_components/Rating";
import { Separator } from "@/components/ui/separator";


const page = async ({ params }: { params: { productId: string } }) => {
  const profiles = await prisma.profile.findMany();
  const product = await getProductById(params.productId);
  const profile = await getCurrentProfile();
  if (!product) {
    return null;
  }
  // console.log(profile)
  const products = await getProductByCategoryId(product?.category);
  const relatedProducts = products
    ?.filter((product) => product.id === product.id)
    .slice(0, 12);
  const relatedProductsLength = relatedProducts?.length || 0;
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/login");
  }

  
  return (
    <div className="py-6 bg-white">
      <Container>
        <div className="flex flex-col items-start gap-y-10">
          <ProductContainerDetails product={product} user={user} />
          {relatedProductsLength > 0 && (
            <div className="bg-white p-2 rounded-md w-full">
              <h2 className="text-2xl font-semibold text-slate-800 my-3">
                Related Products
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {relatedProducts?.map((product) => (
                  <div key={product.id}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          )}
          <Separator className="h-[1px] bg-slate-600"/>
          <div className="rounded-md p-4 grid grid-cols-1 lg:grid-cols-6 gap-4 w-full">
            <div className="flex flex-col items-start gap-2 p-2 lg:p-4 lg:col-span-2 w-full border-r-[1px]">
              <RatingComponent reviews={product.reviews}/>
              <AddRating profile={profile!} product={product} />
            </div>
            {product.reviews.length > 0 ? (
              <ListRating
                product={product}
                profiles={profiles}
                profileId={profile?.id}
              />
            ) : (
              <div className="flex gap-2 items-start flex-col">
                <h1>No Review on This Product</h1>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default page;
