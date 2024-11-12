import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Sidebar from "./Sidebar";

const Navbar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className=""
        >
          <MenuIcon className="w-8 h-8" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} >
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default Navbar;
