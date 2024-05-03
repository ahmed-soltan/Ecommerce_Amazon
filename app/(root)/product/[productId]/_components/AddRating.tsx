"use client";
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
import { Rating } from "@mui/material";
import { Order, Products, Profile, Review, orderType } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type AddRatingProps = {
  product: Products & {
    reviews: Review[];
  };
  profile: Profile & {
    Order: Order[];
  };
};
const AddRating = ({ product, profile }: AddRatingProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<FieldValues>({
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });
  const setCustomValue = (id: string, value: any) => {
    form.setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onSubmit = async (values: FieldValues) => {
    if (values.rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    const productRating = {
      ...values,
      productId: product.id,
      profileId: profile?.id,
    };
    console.log(productRating);
    setIsLoading(true);
    axios
      .patch(`/api/profiles/${profile.id}/rating`, productRating)
      .then(() => {
        toast.success("Rating added successfully");
        router.refresh();
      })
      .catch((err) => {
        console.error(err.response.data.error);
        toast.error("something went wrong");
      })
      .finally(() => {
        form.reset();
        setIsLoading(false);
      });
  };

  if (!profile || !product) return null;

  const deliveredOrder =
    profile &&
    profile.Order &&
    profile.Order.some((order: Order) => {
      return order.products.find(
        (item: orderType) =>
          item.productId === product.id && order.deliveryStatus
      );
    });
  const profileReview =
    product?.reviews &&
    product?.reviews.find((review: any) => review.profileId === profile?.id);

  if (profileReview || !deliveredOrder) {
    return null;
  }

  

  return (
    <div className="flex flex-col gap-2 w-full">
      <h1 className="text-2xl text-slate-700 font-medium"></h1>
      <Rating
        onChange={(event, newValue) => setCustomValue("rating", newValue)}
      />
      <Form {...form}>
        <form className="space-y-2">
          <FormField
            name="comment"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel htmlFor="comment">Add Your Comment</FormLabel>
                  <FormControl>
                    <Textarea disabled={isLoading} required {...field} className="w-full mb-2"/>
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <Button disabled={isLoading} onClick={form.handleSubmit(onSubmit)} variant={"amazonBtn"}>
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </form>
      </Form>
      <Separator />

    </div>
  );
};

export default AddRating;
