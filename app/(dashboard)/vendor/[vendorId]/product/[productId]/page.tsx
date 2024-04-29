import { getProductById } from "@/actions/getProductById";
import ProductDetails from "./_components/ProductDetails";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import ProductTitleEdit from "./_components/ProductTitleEdit";
import ProductDescriptionEdit from "./_components/ProductDescriptionEdit";
import ProductBrandEdit from "./_components/ProductBrandEdit";
import ProductCategoryEdit from "./_components/ProductCategoryEdit";
import ProductDiscountEdit from "./_components/ProductDiscountEdit";
import ProductPriceEdit from "./_components/ProductPriceEdit";
import ProductImagesEdit from "./_components/ProductImagesEdit";
import ProductAvailabiltyEdit from "./_components/ProductAvailabiltyEdit";
import ProductSizesEdit from "./_components/ProductSizesEdit";

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
    <div className="p-6 flex flex-col items-start gap-4">
      <h1 className="text-slate-800 font-medium text-3xl">Product Details</h1>
      <Separator />
      <div className="flex items-center gap-4 w-full">
        <ProductTitleEdit
          product={product}
          productId={params.productId}
          vendorId={params.vendorId}
        />
        <ProductPriceEdit
          product={product}
          productId={params.productId}
          vendorId={params.vendorId}
        />
      </div>
      <ProductDescriptionEdit
        product={product}
        productId={params.productId}
        vendorId={params.vendorId}
      />
      <div className="flex items-center gap-4 w-full">
        <ProductAvailabiltyEdit
          product={product}
          productId={params.productId}
          vendorId={params.vendorId}
        />
        <ProductBrandEdit
          product={product}
          productId={params.productId}
          vendorId={params.vendorId}
        />
      <ProductDiscountEdit
        product={product}
        productId={params.productId}
        vendorId={params.vendorId}
      />
      </div>
      <ProductCategoryEdit
        product={product}
        productId={params.productId}
        vendorId={params.vendorId}
      />
      {product.category !== "Clothes" && product.category !== "Shoes" ? null : (
        <ProductSizesEdit
          product={product}
          productId={params.productId}
          vendorId={params.vendorId}
        />
      )}

      <ProductImagesEdit
        product={product}
        productId={params.productId}
        vendorId={params.vendorId}
      />
    </div>
  );
};

export default page;
