import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import Sidebar from "./Sidebar";

const Navbar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className=""
        >
          <MenuIcon className="w-10 h-10" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} >
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default Navbar;
