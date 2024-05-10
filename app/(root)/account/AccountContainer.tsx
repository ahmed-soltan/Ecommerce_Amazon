"use client";

import { account } from "@/Utils/account";
import Link from "next/link";
import { Profile, User } from "@prisma/client";
import { ManageProfiles } from "../components/ManageProfile";

const AccountContainer = ({user}:{user:User & {
  profile:Profile[]
}}) => {
  const currentProfile = user?.profile?.find(
    (profile: any) => profile.isSelected === true
  );

  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex flex-col items-start gap-4 md:hidden w-full">
        <h1 className="font-bold text-2xl">Your Profiles</h1>
        <ManageProfiles user={user} />
      </div>
      <h1 className="font-bold text-2xl">Your Account</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-6">
        {account.map((list) => {
          return (
            <Link
              href={
                list.url === "/login"
                  ? `${list.url}`
                  : !user
                  ? "/login"
                  :  list.url === "/orders" ? `/profile/${currentProfile?.id}/orders`:`${list.url}/${user.id}`
              }
              className="flex items-center gap-3 border-[2px] rounded-md px-3 py-6"
              key={list.title}
            >
              <div>
                <list.icon className="w-10 h-10 mr-2" color="#006666" />
              </div>
              <div className="flex items-start flex-col">
                <h1 className="text-lg">{list.title}</h1>
                <p className="text-slate-500 text-sm">{list.label}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AccountContainer;
