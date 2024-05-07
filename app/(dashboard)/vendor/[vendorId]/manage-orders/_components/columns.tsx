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
import moment from "moment";
import { Order, orderType } from "@prisma/client";


export const columns: ColumnDef<Order & {
  ShippingAddress:{
    name: string;
  }
}>[] = [
  {
    accessorKey: "ShippingAddress",
    header: ({ column }) => {
      return (
        <Button variant="ghost">
          Order Id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const ShippingAddress = row.getValue("ShippingAddress");
      //@ts-ignore
      return ShippingAddress!.name
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
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const products:orderType[] = row.getValue("products")
      const amount = products.reduce((acc, product) => (
        acc + product.priceAfterDiscount * product.quantity
      ),0)
      return formatPrice(amount);
    },
  },
  {
    accessorKey: "paymentStatus",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Payment Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const paymentStatus = row.getValue("paymentStatus") || false;
      return (
        <Badge
          className={cn(paymentStatus==="open" && "bg-slate-400", paymentStatus==="complete" && "bg-green-600")}
        >
          {paymentStatus==="open" ? `Canceled` : "Completed"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "deliveryStatus",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Delivery Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const deliveryStatus = row.getValue("deliveryStatus") || false;
      return (
        <Badge
          className={cn(!deliveryStatus && "bg-slate-400", deliveryStatus && "bg-green-600")}
        >
          {deliveryStatus ? `Delivered` : "Not Yet Delivered"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") || false;
      return (
        <p className="text-slate-700">{moment(createdAt).fromNow()}</p>
      );
    },
  },
  {
    accessorKey: "products",
    header: ({ column }) => {
      return (
        <Button variant="ghost">
          Action
        </Button>
      );
    },
    cell: ({ row }) => {
      const { id } = row.original;
      const products:orderType[] = row.getValue("products");

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

            <Link href={`/vendor/${products[0].vendorId}/order/${id}`}>
              <DropdownMenuItem className="flex items-center">
                <Pencil className="w-4 h-4 mr-2" />
                View
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
