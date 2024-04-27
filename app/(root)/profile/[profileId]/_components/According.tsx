import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ClothingShoesPreferences, Profile } from "@prisma/client";
import { Gender } from "./Gender";
import { HeigthAndWeight } from "./HeigthAndWeight";
import { AgeGroup } from "./AgeGroup";

type clothingShoesPreferencesProps = {
  profile: Profile & {
    clothingShoesPreferences: ClothingShoesPreferences | null;
  };
};
export const Clothes = ({ profile }: clothingShoesPreferencesProps) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Prefered Department</AccordionTrigger>
        <AccordionContent className={"flex items-start flex-col gap-3"}>
          <p className="text-slate-800 font-medium text-sm">
            {profile.clothingShoesPreferences
              ? profile.clothingShoesPreferences.gender
              : "_ _"}
          </p>
          <Gender
            clothingShoesPreferences={profile.clothingShoesPreferences}
            profileId={profile.id}
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Height & Weigth</AccordionTrigger>
        <AccordionContent className={"flex items-start flex-col gap-3"}>
          <p className="text-slate-800 font-medium text-sm">
            Height :
            {profile.clothingShoesPreferences
              ? profile.clothingShoesPreferences.height
              : "_ _"}
          </p>
          <p className="text-slate-800 font-medium text-sm">
            Weigth :
            {profile.clothingShoesPreferences
              ? profile.clothingShoesPreferences.weight
              : "_ _"}
          </p>
          <HeigthAndWeight
            clothingShoesPreferences={profile.clothingShoesPreferences}
            profileId={profile.id}
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Age Group</AccordionTrigger>
        <AccordionContent className={"flex items-start flex-col gap-3"}>
          <p className="text-slate-800 font-medium text-sm">
            {profile.clothingShoesPreferences
              ? profile.clothingShoesPreferences.age
              : "_ _"}
          </p>
          <AgeGroup
            clothingShoesPreferences={profile.clothingShoesPreferences}
            profileId={profile.id}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
