import { getCurrentUser } from "@/actions/getCurrentUser";
import Link from "next/link";
import { SideNavSheet } from "./SideNavSheet";
import { getCurrentProfile } from "@/actions/getCurrentProfile";

const Nav = async () => {
  const user = await getCurrentUser();
  const profile = await getCurrentProfile()
  const vendor = user?.vendor;

  return (
    <div className="bg-gray-800 w-full text-white font-medium py-1">
      <div className="flex flex-row items-center justify-start text-[15px] gap-5 px-2">
        <div>
          <SideNavSheet user={user!} profile={profile!}/>
        </div>
        <div>
          <Link href={"/products?&page=1"}>Today&apos;s Deals</Link>
        </div>
        <div>
          {user && user?.role==="ADMIN" ?  <Link href={`/admin`}>Dashboard</Link> : vendor ? (
            <Link href={`/vendor/${vendor.id}/profile`}>Dashboard</Link>
          ) : (
            <Link href={"/sell"}>Sell</Link>
          )}
        </div>
        <div>
          <Link href={"/buy-again"}>Buy Again</Link>
        </div>
        {user && (
          <div>
            <Link href={"#"}>{user?.username}&apos;s Amazon.com</Link>
          </div>
        )}
        <div  className="hidden lg:block">
          <Link href={"/browsing-history"} >Browsing History</Link>
        </div>
        <div>
          <Link href={"/wishlist"}>Your Wishlist</Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;
