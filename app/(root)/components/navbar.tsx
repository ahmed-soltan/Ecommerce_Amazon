import Image from "next/image";
import SearchBar from "./SearchBar";
import Link from "next/link";
import { AccountLists } from "./AccountLists";

import logo from "../../../public/amazonLogo.png";
import { getCurrentUser } from "@/actions/getCurrentUser";
import CartTotal from "./CartTotal";
import { getCurrentProfile } from "@/actions/getCurrentProfile";


const Navbar = async () => {
  const user = await getCurrentUser();
  const profile = await getCurrentProfile();
 
  return (
    <div className="w-full">
      <div className="flex flex-row justify-start items-center bg-slate-900 text-white gap-3 px-4 py-2 lg:py-[1px] ">
        <div className="relative">
          <Link href="/">
            <Image
              src={logo}
              alt="Amazon Logo"
              className="object-contain"
              width={150}
              height={150}
            />
          </Link>
        </div>
        <SearchBar />
        <div>
          <AccountLists user={user!} />
        </div>
        <Link href={`/profile/${profile?.id}/orders`} className="flex flex-col items-start px-3">
          <span className="text-sm">Return </span>
          <p className="text-sm font-bold">Orders</p>
        </Link>
        <div className="relative">
          <CartTotal />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
