import type { Metadata } from "next";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Amazon Clone",
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className=" block md:hidden h-[55px] w-full inset-x-0 fixed z-50 p-2 bg-slate-100 shadow-md">
        <Navbar/>
      </div>
      <div className="hidden md:flex flex-col w-56 h-full inset-y-0 fixed z-50">
        <Sidebar/>
      </div>
      <main className="md:pl-60 h-full">{children}</main>
    </div>
  );
};

export default DashboardLayout;
