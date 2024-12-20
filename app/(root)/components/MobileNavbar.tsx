import React from "react";
import { HomeIcon, ShoppingCart, User2Icon } from "lucide-react";

import SearchBar from "./SearchBar";
import NavLinkItem from "./NavLinkItem";
import { SideNavSheet } from "./SideNavSheet";

import { getCurrentProfile } from "@/actions/getCurrentProfile";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getCategoriesWithProductCount } from "@/actions/getCategoriesWithProductCount";

const navLinks = [
  { label: "Home", icon: HomeIcon, url: "/" },
  {
    label: "Account",
    icon: User2Icon,
    url: "/account",
  },
  { label: "Cart", icon: ShoppingCart, url: "/cart" },
];

const MobileNavbar = async () => {
  const user = await getCurrentUser();
  const profile = await getCurrentProfile();
  const categories = await getCategoriesWithProductCount();

  return (
    <div>
      <div className=" w-full inset-x-0 fixed z-50 p-4  bg-gradient-to-b from-cyan-100 to-slate-200">
        <SearchBar />
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-50 p-2 px-4 bg-white flex items-center justify-between border-t shadow-md">
        {navLinks.map((navLink) => (
          <NavLinkItem
            label={navLink.label}
            icon={navLink.icon}
            url={navLink.url}
            key={navLink.label}
          />
        ))}
        <SideNavSheet
          user={user!}
          profile={profile!}
          categories={categories!}
        />
      </div>
    </div>
  );
};

export default MobileNavbar;
