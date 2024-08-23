"use client";
import { interests } from "@/Utils/interests";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Interests, Profile } from "@prisma/client";
import axios from "axios";
import { CheckCircle, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

type InterestsProps = {
  profile: Profile & {
    Interests: Interests | null;
  };
};

export const InterestsPage = ({ profile }: InterestsProps) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selected, setSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const updatedInterests = profile?.Interests?.interest.map((interest) => ({
    value: interest,
    label: interest,
  }));

  const isChanged = selectedInterests?.length ===0;

  const handleAddInterest = (interest: string) => {
    const isInterestSelected = selectedInterests?.includes(interest);
    if (isInterestSelected) {
      setSelectedInterests((prev) => prev?.filter((item) => item !== interest));
    } else {
      setSelectedInterests((prev) => (prev ? [...prev, interest] : [interest]));
    }
    setSelected(true);
  };

  const filteredInterests = interests.filter(
    (interest) =>
      !updatedInterests?.some(
        (selectedInterest) => interest.value === selectedInterest.value
      )
  );

  const AddInterests = async () => {
    const FinalInterests = profile?.Interests?.interest
      ? [...profile?.Interests?.interest, ...selectedInterests]
      : [...selectedInterests];
    try {
      setIsLoading(true);
      await axios.patch(
        `/api/profiles/${profile.id}/interests`,
        FinalInterests
      );
      toast.success("interests have been added successfully");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("something went wrong");
    } finally {
      setIsLoading(false);
      setSelectedInterests([])
    }
  };

  return (
    <div className="flex flex-col gap-4 items-start">
      <div className="flex items-center flex-wrap gap-2">
        {filteredInterests.map((interest) => (
          <Button
            className={cn(
              "rounded-full",
              selectedInterests?.includes(interest.value) &&
                "bg-sky-200 border-sky-600 text-sky-700"
            )}
            key={interest.value}
            variant={"outline"}
            onClick={() => handleAddInterest(interest.value)}
            disabled={isLoading}
          >
            {selectedInterests?.includes(interest.value) ? (
              <CheckCircle className="w-4 h-4 mr-1" />
            ) : (
              <PlusCircle className="w-4 h-4 mr-1" />
            )}

            {interest.label}
          </Button>
        ))}
      </div>
      <Button
        onClick={AddInterests}
        className="w-full md:w-auto"
        disabled={isLoading || isChanged}
      >
        Save
      </Button>
    </div>
  );
};
