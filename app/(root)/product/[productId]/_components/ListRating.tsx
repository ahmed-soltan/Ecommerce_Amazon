"use client"
import { Separator } from "@/components/ui/separator";
import { Rating } from "@mui/material";
import { Products, Profile, Review } from "@prisma/client";
import moment from "moment";
import Image from "next/image";
import unknown from "../../../../../public/unknown.jpeg";
import { useState } from "react";
type ProductType = {
  product: Products & {
    reviews: Review[];
  };
  profiles: Profile[];
  profileId: string | undefined;
};

const ListRating = ({ product, profiles, profileId }: ProductType) => {
  const reviews = product.reviews.filter(review => review.profileId !== profileId);
  return (
    <div className="col-span-4 p-4 w-full">
      <div className="text-sm mt-2 w-full">
        {reviews &&
          reviews.map((review: any) => {
            const userProfile = profiles.find(
              (profile: any) => review.profileId === profile.id
            );
            return (
              <div className="flex items-start jus w-full" key={review.id}>
                <div
                  className="flex items-start justify-start flex-col gap-2 w-full"
                  key={review.id}
                >
                  <div className="flex items-center justify-start gap-2">
                    <div className="relative w-[50px]">
                      <Image
                        src={
                          userProfile?.profileImage
                            ? userProfile?.profileImage
                            : unknown
                        }
                        alt={userProfile?.name || "logo"}
                        width={150}
                        height={150}
                        className="rounded-full border-[1.5px] border-cyan-300 p-1"
                        style={{ aspectRatio: "1/1" }}

                      />
                    </div>
                    <div className=" flex flex-col items-start">
                      <h1 className="text-slate-900 font-medium ">
                        {userProfile?.name || "Guest"}
                      </h1>
                      <p className="text-slate-500 text-sm">
                        {moment(review.createdAt).fromNow()}
                      </p>
                    </div>
                  </div>
                  <Rating value={review.rating} readOnly />

                  <p className="flex text-slate-800 font-medium">
                    {review.comment}
                  </p>
                  <Separator className="my-2" />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ListRating;
