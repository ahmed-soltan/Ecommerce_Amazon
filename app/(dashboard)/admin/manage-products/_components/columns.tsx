"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pencil } from "lucide-react";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/formatPrice";
import { Products } from "@prisma/client";
import Image from "next/image";
import { shortenTitle } from "@/Utils/stringCut";

export const columns: ColumnDef<Products>[] = [
  {
    accessorKey: "images",
    header: ({ column }) => {
      return (
        <Button variant="ghost">
          Image
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const images: {
        color: string;
        colorCode: string;
        image: string;
      }[] = row.getValue("images");

      const firstImage = images.length > 0 ? images[0].image : null;
      return firstImage ? (
        <Image src={firstImage} alt="Product Image" width={40} height={40} />
      ) : (
        <span>No Image</span>
      );
    },
  },

  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const title : string =row.getValue("name");
      return shortenTitle(title , 40);
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price") || "0");
      return formatPrice(price);
    },
  },
  {
    accessorKey: "inStock",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          in Stock
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const inStock = row.getValue("inStock") || false;
      return (
        <Badge
          className={cn(inStock && "bg-slate-400", inStock && "bg-orange-500")}
        >
          {inStock ? `in Stock` : "out of Stock"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
 
];
