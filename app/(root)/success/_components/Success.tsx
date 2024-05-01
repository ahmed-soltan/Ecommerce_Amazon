"use client";
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { CheckCircle, CheckIcon } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

const Success = ({profileId}:{profileId:string}) => {
  const confetti = useConfettiStore();
  useEffect(()=>{
      confetti.setOpen()
  },[])
  return (
    <div className="flex items-center justify-center w-full h-full flex-col gap-4">
        <CheckIcon className="w-40 h-40 bg-green-600 text-slate-100 rounded-full" />
        <h1 className="text-center text-green-600 text-4xl">
          Purchased Successfully
        </h1>
      <div className="flex items-center gap-3">
      </div>
      <h1 className="text-center text-slate-600 text-xl font-medium">Thank You For Your Purchase</h1>
      <h1 className="text-center text-slate-800 text-xl font-medium">
        Your Order Will Be Delivered Soon
      </h1>
      <h1 className="text-center text-slate-600 text-xl font-medium">Have A Nice Day</h1>
      <Link href={`/profile/${profileId}/orders`}>
      <Button variant={"amazonBtn"}>View Orders</Button>
      </Link>
    </div>
  );
};

export default Success;
