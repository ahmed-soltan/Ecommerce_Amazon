import { redirect } from "next/navigation";

import SidebarRoutes from "./SidebarRoutes";

import { getCurrentUser } from "@/actions/getCurrentUser";
import { getVendor } from "@/actions/getVendor";

const Sidebar = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return redirect("/");
  }


  const vendor = await getVendor(user.id);

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm py-5">
      <div className="flex flex-col items-start h-full">
        <SidebarRoutes vendor={vendor!} />
      </div>
    </div>
  );
};

export default Sidebar;
