"use client";
import { interests } from "@/Utils/interests";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Interests, Profile } from "@prisma/client";
import axios from "axios";
import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

type InterestsProps = {
  profile: Profile & {
    Interests: Interests | null;
  };
};

export const InterestsList = ({ profile }: InterestsProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  // const [updatedInterests, setUpdatedInterests] = useState(
  //   profile?.Interests.interest.map((interest) => ({
  //     value: interest,
  //     label: interest,
  //   }))
  // );


  // const handleRemoveInterest = (selectedInterest: string) => {
  //   if (updatedInterests) {
  //     const filteredInterests = updatedInterests.filter((interest) => {
  //       return interest.value !== selectedInterest;
  //     });
  //     setUpdatedInterests(filteredInterests);
  //   }
  // };

  const updateInterests = async (interest:string) => {
    const filteredInterests = profile.Interests?.interest.filter((selectedInterest) => {
      return selectedInterest !== interest;
    });
    const selectedInterests = filteredInterests?.map(
      (interest) => interest
    );
    try {
      setIsLoading(true);
      await axios.patch(
        `/api/profiles/${profile.id}/interests`,
        selectedInterests
      );
      toast.success("interests have been added successfully");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-start">
      <div className="flex items-center flex-wrap gap-2">
        {profile.Interests?.interest?.map((interest) => (
          <Button
            className={cn("rounded-full")}
            onClick={() => updateInterests(interest)}
            key={interest}
            variant={"outline"}
            disabled={isLoading}
          >
            <XIcon className="w-5 h-5 mr-2" />
            {interest}
          </Button>
        ))}
      </div>
    </div>
  );
};
