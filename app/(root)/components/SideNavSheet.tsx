"use client";

import { MenuIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Link from "next/link";

import { Profile, User, Vendor } from "@prisma/client";

import { sideNavLinks } from "@/Utils/NavLinks";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import GoogleTranslate from "./GoogleTranslation";

export const SideNavSheet = ({
  user,
  profile,
}: {
  user: User & {
    vendor: Vendor | null;
  };
  profile: Profile;
}) => {
  const router = useRouter();
  const navLinks = [
    { label: "Today's Deals", url: "/products?&page=1" },
    {
      label: user && user?.vendor ? "Dashboard" : "Sell",
      url: user && user?.vendor ? `/vendor/${user.vendor.id}/profile` : "/sell",
    },
    { label: "Buy Again", url: "/buy-again" },
    { label: `Amazon.com`, url: "#" },
    { label: "Browsing History", url: "/browsing-history" },
    { label: "Your WishList", url: "/wishlist" },
  ];

  const filterByCategory = (category: string) => {
    if (category === "All") {
      router.push(`/products?page=1`);
    } else {
      router.push(`/products?key=${category}&page=1`);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 font-bold hover:bg-transparent hover:text-white p-0"
        >
          <MenuIcon className="w-7 h-7" />
          <p className="hidden md:block text-[15px]">All</p>
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="overflow-y-auto">
        <SheetHeader className=" w-full">
          <h1 className="font-medium text-xl text-start">
            {profile ? `Hello, ${profile.name}!` : `Hello, Guest!`}
          </h1>
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
            <Separator />
          </div>
          {/* <h1 className="font-medium text-lg text-slate-900">
            Shop By Category
          </h1>
          <div className="flex items-start flex-col gap-4">
            {data?.map((category:Category) => {
              return (
                <p
                  onClick={() => filterByCategory(category.name)}
                  key={category.name}
                  className="cursor-pointer flex items-center text-sm"
                >
                  {category.name}
                </p>
              );
            })}
          </div> */}
          <Separator />
          {sideNavLinks.map((link) => {
            return (
              <div
                className="flex items-center flex-col gap-4"
                key={link.title}
              >
                <h1 className="font-medium text-xl text-slate-800">
                  {link.title}
                </h1>
                {link.links.map((link) => (
                  <Link
                    href={link.url}
                    key={link.label}
                    className="w-full flex flex-row items-center justify-between cursor-pointer gap-2"
                  >
                    <h1 className="font-medium text-slate-600">{link.label}</h1>
                  </Link>
                ))}
              </div>
            );
          })}
          {!user ? (
            <Link href={"/login"}>Login</Link>
          ) : (
            <Button
              variant={"ghost"}
              onClick={handleSignOut}
              className="font-medium text-slate-600 p-0 text-md"
            >
              Sign out
            </Button>
          )}
          <GoogleTranslate />
        </div>
      </SheetContent>
    </Sheet>
  );
};
