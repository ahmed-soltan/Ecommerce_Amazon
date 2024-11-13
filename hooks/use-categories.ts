"use client"

import { useEffect, useState } from "react";

import { getCategoriesWithProductCount } from "@/actions/getCategoriesWithProductCount";

import { Category } from "@prisma/client";

type CategoryWithProductCount = Category & {
  productCount: number;
};

interface BannerProductsProps {
  categories: CategoryWithProductCount[];
}

export const useCategories = () => {
  const [data, setData] = useState<Category[] | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategoriesWithProductCount();
        console.log(categories)
        setData(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return data;
};
