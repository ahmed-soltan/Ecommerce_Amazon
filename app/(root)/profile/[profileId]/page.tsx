import { getProfileById } from "@/actions/getProfileById";
import Container from "../../../../components/Container";
import unknown from "../../../../public/unknown.jpeg";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Pencil } from "lucide-react";
import { AddProfile } from "../../components/AddProfile";
import { Separator } from "@/components/ui/separator";
import { Clothes } from "./_components/According";
import { InterestsPage } from "./_components/Interests";
import { Button } from "@/components/ui/button";
import { InterestsList } from "./_components/InterestsList";

const ProfileIdPage = async ({ params }: { params: { profileId: string } }) => {
  const profile = await getProfileById(params.profileId);
  if (!profile) {
    return redirect("/");
  }
  return (
    <div className="p-6">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-8 gap-5">
          <div className="lg:col-span-2 border flex items-center justify-start flex-col gap-3 p-5">
            <div className="relative aspect-auto">
              <Image
                src={profile.profileImage || unknown}
                alt={profile.name}
                width={100}
                height={100}
                className="rounded-full border-[1.5px] border-orange-300 p-1"
              />
            </div>
            <div className="flex items-center">
              <h1 className="text-center font-medium text-2xl text-slate-800">
                {profile.name}
              </h1>
              <AddProfile
                icon={true}
                profile={profile}
                title={"Update Profile"}
                userId={profile.userId}
              />
            </div>
          </div>
          <div className="border lg:col-span-5 p-5">
            <div className="flex flex-col items-start w-full gap-5">
              <h1 className="text-3xl font-medium">Your Profile </h1>
              <p className="text-slate-700 text-sm">
                Your profile preferences help us personalize recommendations for
                you.
              </p>
              <div className="flex flex-col items-start w-full rounded-lg gap-5">
                <div className="bg-slate-100 border-2 flex items-center w-full p-5 gap-2 rounded-lg flex-wrap">
                  <span className="font-medium text-2xl">
                    Clothing & Shoes |{" "}
                  </span>

                  <p className="text-slate-500 text-lg"> Size, fit and price</p>
                </div>
                <h1 className="text-lg font-bold">About You</h1>
                <Separator />
                <Clothes profile={profile} />
              </div>
              <div className="flex flex-col items-start w-full rounded-lg gap-5">
                <div className="bg-slate-100 border-2 flex items-center w-full p-5 gap-2 rounded-lg flex-wrap">
                  <span className="font-medium text-2xl">Interests | </span>
                  <p className="text-slate-500 text-lg">
                    Activities and hobbies
                  </p>
                </div>
                {profile?.Interests?.interest && (
                  <InterestsList profile={profile} />
                )}
                <p className="text-xs text-slate-500">
                  <span className="font-bold text-lg text-slate-800">
                    Suggested interests{" "}
                  </span>{" "}
                  Based on your Amazon activity and popular interests
                </p>
                <Separator />
                <InterestsPage profile={profile} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProfileIdPage;
