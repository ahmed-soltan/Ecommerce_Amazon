import { Button } from "@/components/ui/button";
import { ArrowRight, Coins, CoinsIcon, PlaneIcon } from "lucide-react";


const Section3 = () => {
  return (
    <div className="flex items-center flex-col flex-wrap h-full py-8 gap-10">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-200 text-center bg-slate-700 px-5 py-10 rounded-md">
        On average, sellers see a 20–25% increase in sales after adopting FBA.
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <div className="flex flex-col items-start gap-3 max-w-[400px] justify-between">
          <PlaneIcon className="w-6 h-6" />
          <h1 className="text-base md:text-lg lg:text-xl font-bold text-slate-800">
            Outsource your logistics
          </h1>
          <p className="text-sm text-slate-700">
            With Fulfillment by Amazon (FBA), you store products in our
            fulfillment centers, and we pick, pack, ship, and deliver to
            customers while handling returns and customer service. New sellers
            can also enjoy credits for shipments into our fulfillment network as
            part of New Seller Incentives.
          </p>
          <Button variant={"link"} className="p-0">
            Learn More <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4 ml-2"/>
          </Button>
        </div>
        <div className="flex flex-col items-start max-w-[400px] justify-between gap-3">
          <Coins className="w-6 h-6"/>
          <h1 className="text-base md:text-lg lg:text-xl font-bold text-slate-800">
            Advertise with Amazon
          </h1>
          <p className="text-sm text-slate-700">
            Get discovered, increase sales, and control costs with Amazon Ads.
            Use cost-per-click (CPC) campaigns to showcase your products and
            brand, or try formats like video, audio, and devices ads. You
            control your bids and budget, which means you never have to
            overspend.
          </p>
          <Button variant={"link"} className="p-0">
            Learn More <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4 ml-2"/>
          </Button>
        </div>
        <div className="flex flex-col items-start max-w-[400px] justify-between gap-3">
          <CoinsIcon className="w-6 h-6" />
          <h1 className="text-base md:text-lg lg:text-xl font-bold text-slate-800">
            Sell more with the New Seller Guide
          </h1>
          <p className="text-sm text-slate-700">
            The New Seller Guide is a set of brand, logistics, pricing, and
            promotional services that we recommend to sellers who are just
            getting started with Amazon. Sellers who adopt these services can
            take advantage of over $50,000 in New Seller Incentives.
          </p>
          <Button variant={"link"} className="p-0">
            Learn More <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4 ml-2"/>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Section3;
