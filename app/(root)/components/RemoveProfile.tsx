"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { LucideIcon, Pencil, PlusCircle, Trash } from "lucide-react";
import { Profile } from "@prisma/client";
import { Form, FormControl, FormField } from "@/components/ui/form";
import FileUpload from "@/components/fileUpload";
import { useState } from "react";
import Image from "next/image";
import unknown from "../../../public/unknown.jpeg";
import { cn } from "@/lib/utils";

type RemoveProfileProps = {
  profiles: Profile[];
  userId: string;
};
export const RemoveProfile = ({
  profiles,
  userId,
}: RemoveProfileProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const onDelete = async (id:string) => {
    try {
      setIsLoading(true)
      await axios.delete(`/api/profiles/${id}`);
      toast.success("profile Deleted successfully");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Trash className={"w-4 h-4"} />
          <span className="ms-2">Remove Profile</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Remove Profile</DialogTitle>
          <Separator />
          <DialogDescription>
            Profiles help personalize Amazon for everyone sharing this account.
          </DialogDescription>
        </DialogHeader>
        <div className={cn(
          "flex items-start flex-col gap-4 w-full",
          isLoading && "cursor-not-allowed pointer-events-none bg-slate-100 opacity-75"
        )}>
          {profiles.map((profile) => {
            return (
              <div
                className={`w-full p-2 flex flex-row items-center justify-between cursor-pointer`}
                key={profile.id}
              >
                <div>
                  <div className="flex items-center gap-2 w-full">
                    <>
                      <Image
                        src={
                          profile.profileImage ? profile.profileImage : unknown
                        }
                        alt="profile image"
                        width={40}
                        height={40}
                        className="rounded-full"
                        style={{ aspectRatio: "1/1" }}

                      />
                      <div className="flex flex-col items-start">
                        <p className="text-black text-sm">{profile.name}</p>
                        {profile.isHolderAccount ? (
                          <p className="text-xs font-normal text-slate-500">
                            Account Holder
                          </p>
                        ) : (
                          <p className="text-xs font-normal text-slate-500">
                            Adult Account
                          </p>
                        )}
                      </div>
                    </>
                  </div>
                </div>
                {!profile.isHolderAccount && (

                  <Button
                  variant={"ghost"}
                  className="text-sm flex items-center hover:bg-transparent text-teal-600 hover:text-orange-400 gap-1"
                  onClick={()=>onDelete(profile.id)}
                  >
                  Remove
                </Button>
                )}
              </div>
            );
          })}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
