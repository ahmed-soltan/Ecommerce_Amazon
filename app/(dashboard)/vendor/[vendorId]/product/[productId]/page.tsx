import { redirect } from "next/navigation";

import ProductContainer from "./_components/ProductContainer";

import { getProductById } from "@/actions/getProductById";
import { getCategoryById } from "@/actions/getCategoryById";
import { getCategoriesByVendorId } from "@/actions/getCategoryByVendorId";

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
  const categories = await getCategoriesByVendorId(params.vendorId);

  return (
    <div className="bg-slate-100">
      <ProductContainer
        product={product}
        vendorId={params.vendorId}
        productId={params.productId}
        category={category!}
        categories={categories}
      />
    </div>
  );
};

export default page;
