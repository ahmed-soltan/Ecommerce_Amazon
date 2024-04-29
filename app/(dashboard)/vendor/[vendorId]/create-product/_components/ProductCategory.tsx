"use client";

import { LucideIcon } from "lucide-react";

type ProductCategoryProps = {
  selected?: boolean;
  label: string;
  onClick: (value: string) => void;
  icon: LucideIcon;
};

const ProductCategory = ({
  selected,
  label,
  onClick,
  icon: Icon,
}: ProductCategoryProps) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`rounded-xl border-2 p-4 flex flex-col items-center gap-2 hover:border-slate-500 transition cursor-pointer ${
        selected ? "border-slate-500" : "border-slate-200"
      }`}
    >
      <Icon className="w-5 h-5 mr-2" />
      <div className="font-medium text-sm text-center break-normal">
        {label}
      </div>
    </div>
  );
};

export default ProductCategory;
