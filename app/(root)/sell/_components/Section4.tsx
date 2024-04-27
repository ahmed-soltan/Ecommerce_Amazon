import { Button } from "@/components/ui/button";
import image1 from "../../../../public/images/pexels-energepiccom-110471.jpg";
import image2 from "../../../../public/images/pexels-andrea-piacquadio-3758163.jpg";
import image3 from "../../../../public/images/pexels-polina-tankilevitch-7382447.jpg";
import Image from "next/image";

const Section4 = () => {
  return (
    <div className="flex items-center flex-col flex-wrap h-full py-8 gap-10">
      <h1 className="text-6xl font-bold text-slate-800 text-center">
        Brand Case Studies
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <div className="flex flex-col items-start justify-evenly gap-3 max-w-[400px] h-[450px] shadow-xl p-3 rounded-md">
          <Image
            src={image1}
            alt="image"
            width={400}
            height={50}
            className="object-cover h-[200px]"
          />
          <Button variant={"ghost"} className="bg-slate-300">
            Case Study
          </Button>
          <h1 className="text-xl font-bold text-slate-800">Freshly Picked</h1>

          <p className=" text-slate-700">
            With Fulfillment by Amazon (FBA), you store products in our
            fulfillment centers, and we pick, pack, ship, and deliver to
            customers.
          </p>
        </div>
        <div className="flex flex-col items-start justify-evenly max-w-[400px] h-[450px] shadow-xl p-3 rounded-md gap-3">
          <Image
            src={image2}
            alt="image"
            width={400}
            height={100}
            className="object-cover h-[200px]"
          />

          <Button variant={"ghost"} className="bg-slate-300">
            Case Study
          </Button>
          <h1 className="text-xl font-bold text-slate-800">Hope & Henry</h1>

          <p className=" text-slate-700">
            Get discovered, increase sales, and control costs with Amazon Ads.
            Use cost-per-click (CPC) campaigns to showcase your products.
          </p>
        </div>
        <div className="flex flex-col items-start justify-evenly max-w-[400px] h-[450px] shadow-xl p-3 rounded-md gap-3">
          <Image
            src={image3}
            alt="image"
            width={400}
            height={50}
            className="object-cover h-[200px]"
          />

          <Button variant={"ghost"} className="bg-slate-300">
            Case Study
          </Button>
          <h1 className="text-xl font-bold text-slate-800">New Republic</h1>

          <p className=" text-slate-700">
            The New Seller Guide is a set of brand, logistics, pricing, and
            promotional services that we recommend to sellers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section4;
