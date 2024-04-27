import { getCurrentProfile } from "@/actions/getCurrentProfile";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const navLinks = [
  { label: "Toady's Deals", url: "/products" },
  {
    label: "Sell",
    url: "/sell",
  },
  { label: "Buy Again", url: "/buy-again" },
  { label: `Amazon.com`, url: "#" },
  { label: "Browsing History", url: "#" },
  { label: "Your WishList", url: "/wishlist" },
];

export const SideNavSheet = async () => {
  const user = await getCurrentUser();

  const profile = user?.id && await getCurrentProfile(user?.id);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 font-bold hover:bg-transparent hover:text-white p-0"
        >
          <MenuIcon className="w-5 h-5" />
          <p className="hidden md:block">All</p>
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader className=" w-full">
          <Separator />
        </SheetHeader>
        <div className="flex items-start flex-col gap-4 my-2">
          <div className=" md:hidden flex items-start flex-col gap-4 my-2">
            {navLinks.map((link) => {
              return (
                <Link
                  href={link.url}
                  key={link.label}
                  className="w-full flex flex-col items-start cursor-pointer gap-2"
                >
                  <h1 className="font-medium text-slate-600">{link.label}</h1>
                </Link>
              );
            })}
          </div>
          <h1 className="font-bold text-xl text-slate-800">Shop By Category</h1>
          <Separator />
        </div>
      </SheetContent>
    </Sheet>
  );
};
