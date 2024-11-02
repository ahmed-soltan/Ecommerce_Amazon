import { getFilteredProducts } from "@/actions/getFilteredProducts";
import Container from "@/components/Container";
import ProductsContainer from "./_components/ProductsContainer";

type SearchProps = {
  searchParams: {
    key: string;
    page: number;
    pageSize: number;
  };
};

const ProductsPage = async ({ searchParams }: SearchProps) => {
  const products = await getFilteredProducts({ ...searchParams });

  return (
    <div className="py-6">
      <ProductsContainer products={products!} searchParams={searchParams} />
    </div>
  );
};

export default ProductsPage;
