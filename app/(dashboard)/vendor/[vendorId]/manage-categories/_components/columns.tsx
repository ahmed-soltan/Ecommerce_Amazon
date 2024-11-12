"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pencil } from "lucide-react";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/formatPrice";
import { Category, Products } from "@prisma/client";
import { shortenTitle } from "@/Utils/stringCut";

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "image",
    header: ({ column }) => {
      return (
        <Button variant="ghost">
          Image
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const image: string = row.getValue("image");

      return image ? (
        <Image src={image} alt="Product Image" width={60} height={60} />
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
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name: string = row.getValue("name");
      return shortenTitle(name, 40);
    },
  },
  {
    accessorKey: "products",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          No. Products
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const products: Products[] = row.getValue("products");
      const number = products ? products.length : 0;
      return number;
    },
  },
  {
    accessorKey: "vendorId",
    header: ({ column }) => {
      return <Button variant="ghost">Actions</Button>;
    },
    cell: ({ row }) => {
      const { id } = row.original;
      const vendorId = row.getValue("vendorId");

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <Link href={`/vendor/${vendorId}/category/${id}`}>
              <DropdownMenuItem className="flex items-center">
                <Pencil className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
