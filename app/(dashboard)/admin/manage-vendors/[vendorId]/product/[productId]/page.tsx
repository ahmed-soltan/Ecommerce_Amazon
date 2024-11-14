import { getProductById } from "@/actions/getProductById";
import { redirect } from "next/navigation";

import ProductContainer from "./_components/ProductContainer";
import { getCategoryById } from "@/actions/getCategoryById";

const page = async ({
  params,
}: {
  params: { vendorId: string; productId: string };
}) => {
  const product = await getProductById(params.productId, params.vendorId);
  if (!product) {
    return redirect(`/vendor/${params.vendorId}/manage-products`);
  }

  const category = await getCategoryById(product.categoryId!);

  return (
    <ProductContainer
      product={product}
      category={category!}
    />
  );
};

export default page;
