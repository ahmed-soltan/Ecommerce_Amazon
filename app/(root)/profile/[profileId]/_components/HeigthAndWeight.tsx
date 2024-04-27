"use client";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ClothingShoesPreferences } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

export const HeigthAndWeight = ({
  clothingShoesPreferences,
  profileId,
}: {
  clothingShoesPreferences: ClothingShoesPreferences | null;
  profileId: string;
}) => {
  const form = useForm({
    defaultValues: {
      height: clothingShoesPreferences?.height || "",
      weight: clothingShoesPreferences?.weight || "",
    },
  });
  const router = useRouter();

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: FieldValues) => {
    try {
      await axios.patch(`/api/profiles/${profileId}/clothes`, values);
      toast.success(
        `Height & Weight ${
          clothingShoesPreferences?.height || clothingShoesPreferences?.weight
            ? "Updated"
            : "Added"
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
          {clothingShoesPreferences?.height ||
            clothingShoesPreferences?.weight
              ? "Edit"
              : "Add"}{" "}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {clothingShoesPreferences?.height ||
            clothingShoesPreferences?.weight
              ? "Update"
              : "Add"}{" "}
            Height & Weigth
          </DialogTitle>
          <Separator />
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex items-center gap-4">
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        className="rounded-md mx-1"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        className="rounded-md mx-1"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
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
