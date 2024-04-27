"use client";
import { ageGroups } from "@/Utils/ageGroup";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ClothingShoesPreferences } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const AgeGroup = ({
  clothingShoesPreferences,
  profileId,
}: {
  clothingShoesPreferences: ClothingShoesPreferences | null;
  profileId: string;
}) => {
  const form = useForm({
    defaultValues: {
      age: clothingShoesPreferences?.age || "",
    },
  });
  const router = useRouter();

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: FieldValues) => {
    try {
      await axios.patch(`/api/profiles/${profileId}/clothes`, values);
      toast.success(
        `Clothes ${
          clothingShoesPreferences?.age ? "Updated" : "Added"
        } successfully`
      );
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          size={"sm"}
          className="rounded-full text-xs"
        >
          {clothingShoesPreferences?.age ? "Edit" : "Add"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {clothingShoesPreferences?.age ? "Update" : "Add"} Age Group
          </DialogTitle>
          <Separator />
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-center flex-wrap"
          >
            {ageGroups.map((age) => (
              <FormField
                key={age.value}
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <Button
                      variant={"outline"}
                      onClick={() => {
                        form.setValue("age", age.value)
                      }}
                      
                      disabled={isSubmitting}
                      type="button"
                      className={cn(
                        "rounded-full m-1",
                        field.value === age.value &&
                          "bg-sky-200 border-sky-600 text-sky-700"
                      )}
                    >
                      {age.label}
                    </Button>
                  </FormItem>
                )}
              />
            ))}
            <Separator className={"my-3"} />
            <DialogFooter>
              <Button type="submit" variant={"default"} disabled={isSubmitting}>
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
