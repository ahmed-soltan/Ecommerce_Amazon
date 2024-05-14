"use client";

import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Profile, User } from "@prisma/client";
import { ManageProfiles } from "./ManageProfile";


export type AccountListsProps ={
    user:User & {
        profile:Profile[]
    },
    
}

export const AccountLists = ({ user }:AccountListsProps) => {



  const currentProfile = user?.profile?.find(
    (profile: any) => profile.isSelected === true
  );



  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="flex flex-col items-start hover:bg-transparent hover:text-white">
          {user ? (
            <span className="text-sm text-slate-200">Hello, {currentProfile?.name ? currentProfile?.name : "Guest"}</span>
          ) : (
            <Link href={"/login"} className="flex flex-col">
              <span className="text-sm">Hello, Sign in</span>
            </Link>
          )}
          <p className="font-bold text-sm">Account & Lists</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[400px] p-3">
        <DropdownMenuLabel className="flex items-center justify-center flex-col px-0">
          {user ? (
            <>
              <ManageProfiles user={user} />
            </>
          ) : (
            <>
              <Link href={"/login"} className="w-full">
                <div>
                  <Button variant={"amazonBtn"} className="text-sm w-full">Sign in</Button>
                </div>
              </Link>
              <p className="text-xs my-2">
                New Customer?{" "}
                <Link href={"/register"} className="text-blue-400">
                  start here.
                </Link>
              </p>
            </>
          )}
          <hr className="w-full border-[0.5] my-2" />
        </DropdownMenuLabel>
        <div className="grid grid-cols-2 gap-2">
          <div className="border-r-[1px] border-slate-300">
            <h1 className="font-bold mb-2">Your Lists</h1>
            <ul className="flex flex-col gap-[7px] text-xs">
              <li>
                <Link href={"#"}>Create Your List</Link>
              </li>
              <li>
                <Link href={"#"}>Find A List or Registry</Link>
              </li>
            </ul>
          </div>
          <div>
            <h1 className="font-bold mb-2">Your Account</h1>
            <ul className="flex flex-col gap-[7px] text-sm">
              <li>
                <Link href={"/account"}>Account</Link>
              </li>
              <li>
                <Link href={"/orders"}>Orders</Link>
              </li>
              <li>
                <Link href={"#"}>Recommendation</Link>
              </li>
              <li>
                <Link href={"#"}>Wishlist</Link>
              </li>
              <li>
                <Link href={"#"}>Subscribe</Link>
              </li>
              {user && (
                <li  onClick={() => signOut()}>
                  <Link href={"/"}>
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
