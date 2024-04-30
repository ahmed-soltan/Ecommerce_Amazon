"use client";

import { useCart } from "@/hooks/useCart";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const CartTotal = () => {
  const { cartQtyTotal } = useCart();

  return (
    <Link href={'/cart'} className="relative">
      <ShoppingCart className="w-10 h-10" />
      
      <span className="text-slate-100 absolute top-[-4px] right-[10px] text-sm bg-orange-400 rounded-md px-1">
        {cartQtyTotal}
      </span>
    </Link>
  );
};

export default CartTotal;
