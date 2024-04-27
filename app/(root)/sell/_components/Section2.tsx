import { Button } from "@/components/ui/button";
import sec2Image from "../../../../public/sec2Image.png";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

const Section2 = () => {
  return (
    <div className="flex items-start justify-round flex-wrap h-full py-8 gap-16">
      <div className="relative">
        <Image
          src={sec2Image}
          alt="Start"
          width={600}
          height={600}
          className="object-fit"
        />
      </div>
      <div className="flex items-start flex-col gap-4 w-[700px]">
        <h1 className="text-6xl font-bold text-slate-800">
          Get started with $50,000 in incentives
        </h1>
        <p className="text-slate-800 text-lg">
          Ready to sell with Amazon? As a new seller, you can take advantage of
          a series of incentives.
        </p>
        <ul className="bg-lime-100 flex items-start flex-col gap-3 p-5 rounded-md">
          <li className="flex items-center gap-2">
            <CheckCircle size={14}/>
            <p className="text-slate-600 text-sm">
            <span className="font-bold">10% back</span> on your first $50,000 in branded sales, then 5% back through your first year until you reach $1,000,000
            </p>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle size={14}/>
            <p className="text-slate-600 text-sm">
            <span className="font-bold"> $100 off</span> shipments into the Amazon fulfillment network using the Amazon Partnered Carrier program
            </p>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle size={14}/>
            <p className="text-slate-600 text-sm">
            <span className="font-bold">Free storage and customer returns</span> with auto-enrollment in the FBA New Selection program
            </p>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle size={14}/>
            <p className="text-slate-600 text-sm">
            <span className="font-bold">$50 credit </span>to create Sponsored Products or Sponsored Brands ads
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Section2;
