import ProductsContainer from "./_components/ProductsContainer";

import { getFilteredProducts } from "@/actions/getFilteredProducts";
import { getCategoriesWithProductCount } from "@/actions/getCategoriesWithProductCount";

type SearchProps = {
  searchParams: {
    key: string;
    page: number;
    pageSize: number;
  };
};

const ProductsPage = async ({ searchParams }: SearchProps) => {
  const products = await getFilteredProducts({ ...searchParams });
  const categories = await getCategoriesWithProductCount();

  return (
    <div className="py-6">
      <ProductsContainer
        products={products!}
        searchParams={searchParams}
        categories={categories!}
      />
    </div>
  );
};

export default ProductsPage;
