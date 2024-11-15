"use client";

import { useEffect } from "react";
import { Check } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { useConfettiStore } from "@/hooks/use-confetti-store";

import { Profile } from "@prisma/client";

const Success = ({ profile }: { profile: Profile }) => {
  const confitte = useConfettiStore();

  useEffect(() => {
    confitte.setOpen();
    setTimeout(() => {
      confitte.setClose();
    }, 5000);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full gap-5 mt-10">
      <div className="bg-emerald-600 text-white w-36 h-36 flex items-center justify-center rounded-full">
        <Check className="w-20 h-20" />
      </div>
      <h1 className="text-slate-900 font-medium text-center text-3xl">
        Purchased Successfully
      </h1>
      <p className="text-slate-700 font-medium text-center text-xl">
        Thank You For Your Purchased Your Order Will get You ASAP
      </p>
      <Link href={`/profile/${profile.id}/orders`}>
        <Button variant={"amazonBtn"}>View Your Orders</Button>
      </Link>
    </div>
  );
};

export default Success;
