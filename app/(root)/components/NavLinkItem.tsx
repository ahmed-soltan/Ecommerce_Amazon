
import { LucideIcon } from "lucide-react";
import Link from "next/link";

type NavLinkItemProps={
    label:string;
    icon:LucideIcon
    url:string
}
const NavLinkItem = ({
    label,
    icon: Icon,
    url
}:NavLinkItemProps) => {
  return (
    <Link href={url} className="flex flex-col items-center gap-1">
        <Icon className="w-7 h-7" />
        <p className=" tex-slate-600 hidden sm:block">{label}</p>
    </Link>
  )
}

export default NavLinkItem