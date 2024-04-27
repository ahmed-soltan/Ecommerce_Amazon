import Image from "next/image";
import SearchBar from "./SearchBar";
import Link from "next/link";
import { AccountLists } from "./AccountLists";

import logo from '../../../public/amazonLogo.png'
import { getCurrentUser } from "@/actions/getCurrentUser";

const Navbar = async() => {

  const user = await getCurrentUser();

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between items-center bg-slate-900 text-white gap-3 px-4 py-[1px]">
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
        <div>
            Cart
        </div>
        <div>
            Orders
        </div>
      </div>
    </div>
  );
};

export default Navbar;
