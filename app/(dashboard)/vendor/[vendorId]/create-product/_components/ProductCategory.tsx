"use client";

import { LucideIcon } from "lucide-react";

type ProductCategoryProps = {
  selected?: boolean;
  name: string;
  onClick: (value: string) => void;
};

const ProductCategory = ({
  selected,
  name,
  onClick,
}: ProductCategoryProps) => {
  return (
    <div
      onClick={() => onClick(name)}
      className={`rounded-xl border-2 p-4 flex flex-col items-center gap-2 hover:border-slate-500 transition cursor-pointer ${
        selected ? "border-slate-500" : "border-slate-200"
      }`}
    >
      <div className="font-medium text-sm text-center break-normal">
        {name}
      </div>
    </div>
  );
};

export default ProductCategory;
