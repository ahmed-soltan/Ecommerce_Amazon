import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Products, Review } from "@prisma/client";



interface UseProductsHandlerProps {
  initialProducts: any;
  searchParams: {
    key: string;
    page: any;
    pageSize: any;
  };
}

const useProductsHandler = ({
  initialProducts,
  searchParams,
}: UseProductsHandlerProps) => {
  const [filters, setFilters] = useState({ sort: "none" });
  const [filteredProducts, setFilteredProducts] =
    useState<Products[]>(initialProducts);
  const router = useRouter();
  const searchParamsLinks = useSearchParams();
  const currentPage = searchParamsLinks?.get("page");

  const length = initialProducts ? Math.ceil(initialProducts.length) : 0;

  useEffect(() => {
    setFilteredProducts(initialProducts);
  }, [initialProducts]);

  useEffect(() => {
    sortProducts();
  }, [filters]);

  const sortProducts = () => {
    let sortedProducts = [...filteredProducts];
    if (filters.sort === "price_asc") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (filters.sort === "price_dsc") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else {
      sortedProducts = initialProducts;
    }
    setFilteredProducts(sortedProducts);
  };

  const onPageChange = (increment: number) => {
    const newPage = currentPage ? parseInt(currentPage) + increment : 1;
    if (newPage > 0) {
      const keyQuery = searchParams.key ? `key=${searchParams.key}&` : "";
      router.push(`/products?${keyQuery}page=${newPage}`);
    }
  };

  const onSubmit = (data: { minPrice: number; maxPrice: number }) => {
    const { minPrice, maxPrice } = data;

    const filtered = initialProducts.filter((product:Products) => {
      const price = product.price;
      return price >= minPrice && price <= maxPrice;
    });

    setFilteredProducts(filtered);
  };

  return {
    filters,
    setFilters,
    filteredProducts,
    currentPage,
    length,
    onPageChange,
    onSubmit,
  };
};

export default useProductsHandler;
