import { getProductById } from "@/actions/getProductById";
import { redirect } from "next/navigation";

import ProductContainer from "./_components/ProductContainer";

const page = async ({
  params,
}: {
  params: { vendorId: string; productId: string };
}) => {
  const product = await getProductById(params.productId, params.vendorId);
  if (!product) {
    return redirect(`/vendor/${params.vendorId}/manage-products`);
  }



  return (
 <ProductContainer product={product} vendorId={params.vendorId} productId={params.productId}/>
  );
};

export default page;
