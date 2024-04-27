"use client";

import { BarChart, Compass, Layout, List, PackageOpen, PencilRuler, User2Icon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SidebarItem from "./SidebarItem";
import { Products, Vendor } from "@prisma/client";

const AdminRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    path: "/",
  },
  {
    icon: Compass,
    label: "Browse",
    path: "/search",
  },
];

type SidebarRoutesProps ={
    vendor: Vendor & {
        Products:Products[] | null
    };
}
const SidebarRoutes = ({vendor}:SidebarRoutesProps) => {
    const vendorRoutes = [
      {
        icon: User2Icon,
        label: "Profile",
        path: `/vendor/${vendor?.id}`,
      },
      {
        icon: BarChart,
        label: "Analytics",
        path: `/vendor/${vendor?.id}/analytics`,
      },
      {
        icon: PencilRuler,
        label: "Manage Products",
        path: `/vendor/${vendor?.id}/manage-products`,
      },
      {
        icon: PackageOpen,
        label: "Manage Orders",
        path: `/vendor/${vendor?.id}/manage-orders`,
      },
    ];
  const pathname = usePathname();

  const isVendor = pathname?.includes("/vendor");
  const routes = isVendor ? vendorRoutes : AdminRoutes;
  return (
    <div className="flex flex-col items-start w-full">
      {routes.map((route) => {
        return (
          <SidebarItem
            key={route.label}
            icon={route.icon}
            label={route.label}
            path={route.path}
            
          />
        );
      })}
    </div>
  );
};

export default SidebarRoutes;
