import React, { Dispatch, SetStateAction } from "react";
import { ArrowDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const SORT_OPTIONS = [
  {
    name: "None",
    value: "none",
  },
  {
    name: "Price Low to High",
    value: "price_asc",
  },
  {
    name: "Price High to Low",
    value: "price_dsc",
  },
];

interface SortOptionsProps {
  setFilters: Dispatch<SetStateAction<{ sort: string }>>;
  filters: { sort: string };
}

const SortOptions = ({ setFilters, filters }: SortOptionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Sort
          <ArrowDown className="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          {SORT_OPTIONS.map((option) => (
            <DropdownMenuItem
              key={option.value}
              className={`my-1 ${
                filters.sort === option.value
                  ? "bg-slate-100 text-slate-900"
                  : "bg-transparent text-slate-700"
              }`}
              onClick={() => setFilters({ ...filters, sort: option.value })}
            >
              {option.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortOptions;
