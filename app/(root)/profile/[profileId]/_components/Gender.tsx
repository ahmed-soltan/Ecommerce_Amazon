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
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ClothingShoesPreferences } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const genders = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

export const Gender = ({
  clothingShoesPreferences,
  profileId,
}: {
  clothingShoesPreferences: ClothingShoesPreferences | null;
  profileId: string;
}) => {
  const form = useForm({
    defaultValues: {
      gender: clothingShoesPreferences?.gender || "",
    },
  });
  const router = useRouter();

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: FieldValues) => {
    try {
      await axios.patch(`/api/profiles/${profileId}/clothes`, values);
      toast.success(
        `Clothes ${
          clothingShoesPreferences?.gender ? "Updated" : "Added"
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
          {clothingShoesPreferences?.gender ? "Edit" : "Add"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {clothingShoesPreferences?.gender ? "Update" : "Add"} Gender
          </DialogTitle>
          <Separator />
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex items-center gap-2 ">
              {genders.map((gender) => (
                <FormField
                  key={gender.value}
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <Button
                        variant={"outline"}
                        onClick={() => form.setValue("gender", gender.value)}
                        disabled={isSubmitting}
                        type="button"
                        className={cn(
                          "rounded-md mx-1",
                          field.value === gender.value &&
                            "bg-sky-200 border-sky-600 text-sky-700"
                        )}
                      >
                        {gender.label}
                      </Button>
                    </FormItem>
                  )}
                />
              ))}
            </div>

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
