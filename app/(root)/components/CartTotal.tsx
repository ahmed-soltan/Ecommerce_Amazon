"use client";

import { useCart } from "@/hooks/useCart";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const CartTotal = () => {
  const { cartQtyTotal } = useCart();

  return (
    <Link href={'/cart'} className=" flex items-end">
      <div className="relative">
      <ShoppingCart className="w-10 h-10" />
      
      <span className="text-slate-900 absolute top-[-6px] right-[10px] text-xs bg-yellow-500 rounded-full px-1">
        {cartQtyTotal}
      </span>
      </div>
      cart
    </Link>
  );
};

export default CartTotal;
