"use client";

import { Rating } from "@mui/material";
import axios from "axios";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Pencil, Trash, XIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Order, Products, Profile, Review, User, orderType } from "@prisma/client";
import unknown from "../../../../../../public/unknown.jpeg";
import ConfirmModel from "@/components/ConfirmModel";

type AddRatingProps = {
  product: Products & {
    reviews: Review[];
  };
  profile: Profile & {
    Order: Order[];
    Review: Review[];
  } | null;
  user: User | null;
};

const AddRating = ({ product, profile, user }: AddRatingProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const currentProductReview = profile?.Review?.find(
    (review) => review.productId === product.id
  );
  
  const form = useForm<FieldValues>({
    defaultValues: {
      rating: currentProductReview?.rating || 0,
      comment: currentProductReview?.comment || "",
    },
  });

  const setCustomValue = (id: string, value: any) => {
    form.setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };
  if (!profile || !product) {
    return null;
  }

  const deliveredOrder =
    profile &&
    profile.Order &&
    profile.Order.some((order: Order) => {
      return order.products.find(
        (item: orderType) =>
          item.productId === product.id && order.deliveryStatus
      );
    });

  const { isSubmitting, isValid } = form.formState;

  if (!deliveredOrder) {
    return null;
  }

  const onSubmit = async (values: FieldValues) => {
    try {
      if (values.rating === 0) {
        toast.error("Please select a rating");
        return;
      }
      const productRating = {
        ...values,
        productId: product.id,
        profileId: profile?.id,
      };
      setIsLoading(true);
      await axios.patch(`/api/profiles/${profile.id}/rating`, productRating);
      toast.success("Review Added successfully");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("something went wrong");
    } finally {
      form.reset();
      setIsLoading(false);
      setIsEditing(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(
        `/api/profiles/${profile.id}/rating/${currentProductReview?.id}`
      );
      toast.success("Review Deleted successfully");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("something went wrong");
    } finally {
      form.reset();
      setIsLoading(false);
      setIsEditing(false);
    }
  };

  return (
    <div className="w-full">
      {!isEditing && currentProductReview && (
        <div className="flex items-start w-full">
          <div className="flex items-start justify-start flex-col gap-2 w-full">
            <div className="flex items-center justify-start gap-2">
              <div className="relative w-[50px]">
                <Image
                  src={profile?.profileImage ? profile?.profileImage : unknown}
                  alt={profile?.name || "logo"}
                  width={150}
                  height={150}
                  className="rounded-full border-[1.5px] border-cyan-300 p-1"
                  style={{ aspectRatio: "1/1" }}
                />
              </div>
              <div className=" flex flex-col items-start">
                <h1 className="text-slate-900 font-medium ">
                  {profile?.name || "Guest"}
                </h1>
                <p className="text-slate-500 text-sm">
                  {moment(currentProductReview.createdAt).fromNow()}
                </p>
              </div>
            </div>
            <Rating value={currentProductReview.rating} readOnly />

            <p className="flex text-slate-800 font-medium">
              {currentProductReview.comment}
            </p>
            <Separator className="my-2" />
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={"ghost"}
              size={"sm"}
              onClick={() => setIsEditing(true)}
              disabled={isLoading}
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <ConfirmModel onConfirm={onDelete}>
              <Button disabled={isLoading} variant={"ghost"} size={"sm"}>
                <Trash className="h-4 w-4" />
              </Button>
            </ConfirmModel>
          </div>
        </div>
      )}
      {!isEditing && !currentProductReview && (
        <div className="flex flex-col gap-2 w-full">
          <h1 className="text-2xl text-slate-700 font-medium"></h1>
          <Rating
            onChange={(event, newValue) => setCustomValue("rating", newValue)}
          />
          <Form {...form}>
            <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name="comment"
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel htmlFor="comment">Add Your Comment</FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={isLoading}
                          required
                          {...field}
                          className="w-full mb-2"
                        />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
              <Button
                disabled={isLoading || isSubmitting || !isValid || !user || user.panned}
                variant={"amazonBtn"}
              >
                {isLoading ? "Loading..." : "Submit"}
              </Button>
            </form>
          </Form>
          <Separator />
          {!user && (
            <p className="text-sm text-rose-500">
              You need to sign in to add a review.{" "}
              <Link href={"/login"}>
                <Button variant={"link"} className="pl-0" size={"sm"}>
                  Sign In
                </Button>
              </Link>
            </p>
          )}
          {user && user.panned && (
            <p className="text-sm text-rose-500">
              This Account is Not Allowed To Add Reviews.{" "}
              <Link href={"#"}>
                <Button variant={"link"} className="pl-0" size={"sm"}>
                  Report Now
                </Button>
              </Link>
            </p>
          )}
        </div>
      )}
      {isEditing && currentProductReview && (
        <div className="flex items-start gap-2 w-full">
          <div className="flex flex-col gap-2 w-full">
            <h1 className="text-2xl text-slate-700 font-medium"></h1>
            <Rating
              onChange={(event, newValue) => setCustomValue("rating", newValue)}
              defaultValue={currentProductReview.rating}
            />
            <Form {...form}>
              <form
                className="space-y-2"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  name="comment"
                  control={form.control}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel htmlFor="comment">
                          Add Your Comment
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            disabled={isLoading}
                            required
                            {...field}
                            className="w-full mb-2"
                          />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
                <Button
                  disabled={isLoading || isSubmitting || !isValid}
                  variant={"amazonBtn"}
                >
                  {isLoading ? "Loading..." : "Submit"}
                </Button>
              </form>
            </Form>
            <Separator />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={"ghost"}
              size={"sm"}
              onClick={() => setIsEditing(false)}
            >
              <XIcon className="w-4 h-4 mr-2" />
              <p className="text-slate-700 text-sm">Cancel</p>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddRating;
