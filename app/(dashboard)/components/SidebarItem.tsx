"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

type SidebarItemProps = {
  label: string;
  icon: LucideIcon;
  path: string;
};

const SidebarItem = ({ label, icon: Icon, path }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const isActive =
  (pathname === "/" && path === "/") ||
  pathname === path ||
  pathname?.startsWith(`${path}/`);

  const onClick = () => {
    router.push(path);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "w-full h-full flex items-center gap-x-2 text-slate-500 text-sm font-[500] md:pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive &&
          "text-orange-400 bg-sky-100/20 hover:bg-sky-200/20 hover:text-orange-500"
      )}
    >
      <div
        className={cn(
          "flex items-center gap-x-2 w-full py-4",
          isActive && "border-r-4 border-orange-500 "
        )}
      >
        <Icon
          size={22}
          className={cn({
            "text-slate-500": !isActive,
            "text-orange-500": isActive,
          })}
        />
        <span>{label}</span>
      </div>
    </button>
  );
};

export default SidebarItem;
