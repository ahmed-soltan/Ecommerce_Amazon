import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Image from "next/image";
import unknown from "../../../public/unknown.jpeg";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ArrowRight, PlusCircle } from "lucide-react";
import { AccountListsProps } from "./AccountLists";
import { Separator } from "@/components/ui/separator";
import { AddProfile } from "./AddProfile";
import toast from "react-hot-toast";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { RemoveProfile } from "./RemoveProfile";

export const ManageProfiles = ({ user }: AccountListsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const currentProfile = user?.profile?.find(
    (profile: any) => profile.isSelected === true
  );

  const handleSwitchProfile = async (id: string) => {
    try {
      setIsLoading(true);
      await axios.put(`/api/profiles/${id}`, { isSelected: true });
      toast.success("profile switched successfully");
      router.push("/");
      router.refresh();
    } catch {
      console.error("Error switching profile");
      toast.error("Error switching profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full hover:bg-transparent p-0">
          {!currentProfile || user.profile.length === 0 ? (
            <div className="w-full p-2 flex flex-row items-center justify-between bg-teal-100">
              <p>Who is Shopping ? </p>
              <Button
                variant={"ghost"}
                className="hover:bg-transparent text-teal-600 hover:text-orange-400 gap-1"
              >
                <p>manage profiles</p>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <>
              <div className="w-full p-2 flex flex-row items-center justify-between bg-teal-100">
                <div className="flex items-center gap-2">
                  <>
                    <Image
                      src={
                        currentProfile.profileImage
                          ? currentProfile.profileImage
                          : unknown
                      }
                      alt="profiles image"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="flex flex-col items-start">
                      <p className="text-black font-bold">
                        {currentProfile.name}
                      </p>
                      {currentProfile.isHolderAccount ? (
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
                <Button
                  variant={"ghost"}
                  className="hover:bg-transparent text-teal-600 hover:text-orange-400 gap-1"
                >
                  <p>manage profiles</p>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Who is Shopping</DialogTitle>
        </DialogHeader>
        <Separator />

        <div className={cn(
          "flex items-start flex-col gap-4 w-full",
          isLoading && "cursor-not-allowed pointer-events-none bg-slate-100 opacity-75"
        )}>
          {user.profile.map((profile: any) => {
            return (
              <div
                className={`w-full p-2 flex flex-row items-center justify-between cursor-pointer ${
                  profile.isSelected ? "bg-slate-100 rounded-md" : "bg-white"
                }`}
                key={profile.id}
                
              >
                <div>
                  <div className="flex items-center gap-2 w-full" onClick={() => handleSwitchProfile(profile.id)}>
                    <>
                      <Image
                        src={
                          profile.profileImage ? profile.profileImage : unknown
                        }
                        alt="profile image"
                        width={40}
                        height={40}
                        className="rounded-full"
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

                <Link
                  href={`/profile/${profile.id}`}
                  className="text-sm flex items-center hover:bg-transparent text-teal-600 hover:text-orange-400 gap-1"
                >
                  view
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>

        <Separator />

        <DialogFooter>
          <div className="w-full flex items-center justify-between">
            <AddProfile title="Add Profile" userId={user.id} />
            {user?.profile?.length>1 && (
              <RemoveProfile userId={user.id} profiles={user.profile} />
            )}

          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
