import Image from "next/image";
import SearchBar from "./SearchBar";
import Link from "next/link";
import { AccountLists } from "./AccountLists";

import logo from '../../../public/amazonLogo.png'
import { getCurrentUser } from "@/actions/getCurrentUser";
import { Package2Icon, PackageIcon, ShoppingCart } from "lucide-react";
import CartTotal from "./CartTotal";

const Navbar = async() => {

  const user = await getCurrentUser();
  
  return (
    <div className="w-full">
      <div className="flex flex-row justify-start items-center bg-slate-900 text-white gap-3 px-4 py-[1px]">
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
            <AccountLists user={user!}/>
        </div>
        <div className="relative">
        <CartTotal/>
        </div>
        <div>
           <PackageIcon className="w-7 h-7"/>
           <p>Orders</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
