"use client";

import {
  BarChart,
  Compass,
  Handshake,
  Layout,
  List,
  PackageOpen,
  PencilRuler,
  User2Icon,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SidebarItem from "./SidebarItem";
import { Products, Vendor } from "@prisma/client";

const AdminRoutes = [
  {
    icon: BarChart,
    label: "Analytics",
    path: `/admin/analytics`,
  },
  {
    icon: Users,
    label: "Customers",
    path: `/admin/customers`,
  },
  {
    icon: Handshake,
    label: "Vendors",
    path: `/admin/manage-vendors`,
  },
  {
    icon: PencilRuler,
    label: "Manage Products",
    path: `/admin/manage-products`,
  },
  {
    icon: PackageOpen,
    label: "Manage Orders",
    path: `/admin/manage-orders`,
  },
];

type SidebarRoutesProps = {
  vendor: Vendor & {
    Products: Products[] | null;
  };
};
const SidebarRoutes = ({ vendor }: SidebarRoutesProps) => {
  const vendorRoutes = [
    {
      icon: User2Icon,
      label: "Profile",
      path: `/vendor/${vendor?.id}/profile`,
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
