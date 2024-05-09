import type { Metadata } from "next";
import Navbar from "./components/navbar";
import MobileNavbar from "./components/MobileNavbar";
import Nav from "./components/Nav";
import Container from "@/components/Container";
import Footer from "./components/Footer";
import CartProvider from "@/components/providers/cartProvider";
import { ConfettiProvider } from "@/components/providers/confetti-provider";
import WishListProvider from "@/components/providers/wishlistProvider";
import { BrowsingHistoryContextProvider } from "@/hooks/useBrowsingHistory";

export const metadata: Metadata = {
  title: "Amazon Clone",
};

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full  min-h-screen flex flex-col bg-slate-100">
      <CartProvider>
        <BrowsingHistoryContextProvider>
        <WishListProvider>
          <ConfettiProvider />
          <div className="hidden md:block inset-x-0 fixed z-50">
            <Navbar />
            <Nav />
          </div>
          <div className="block md:hidden">
            <MobileNavbar />
          </div>
          <main className="pt-[60px] md:pt-[100px] ">
            <Container>{children}</Container>
          </main>
          <Footer />
        </WishListProvider>
        </BrowsingHistoryContextProvider>
      </CartProvider>
    </div>
  );
};

export default HomeLayout;
