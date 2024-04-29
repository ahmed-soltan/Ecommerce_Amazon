import { Button } from "@/components/ui/button";
import sec1Image from "../../../../public/sellBanner.png";
import Image from "next/image";
import Link from "next/link";
const Section1 = () => {
  return (
    <div className="flex items-center justify-center flex-wrap h-full py-8 gap-16 bg-gradient-to-r from-cyan-50 to-slate-50">
      <div className="flex items-start flex-col gap-10 w-[600px]">
        <h1 className="text-6xl font-bold text-slate-800">
          Start selling with Amazon
        </h1>
        <p className="text-slate-800 text-2xl">
          The fastest-growing and preferred acquisition channel for over half
          our multichannel sellers.1
        </p>
        <Link href={"/confirm-user"}>
          <Button
            variant={"amazonBtn"}
            className="w-[150px] h-[60px] rounded-full text-xl text-slate-800"
          >
            Sign Up
          </Button>
        </Link>
      </div>
      <div className="relative">
        <Image
          src={sec1Image}
          alt="Start"
          width={600}
          height={600}
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default Section1;
