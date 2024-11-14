"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { LucideIcon, Pencil, PlusCircle } from "lucide-react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField } from "@/components/ui/form";
import FileUpload from "@/components/fileUpload";

import unknown from "../../../public/unknown.jpeg";

import { Profile } from "@prisma/client";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
});

type AddProfileProps = {
  icon?: boolean;
  title: string;
  profile?: Profile;
  userId: string;
};
export const AddProfile = ({
  icon,
  title,
  profile,
  userId,
}: AddProfileProps) => {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [image, setImage] = useState<string | null>(
    profile?.profileImage || null
  );

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: profile?.name || "",
    },
  });

  const handleClose = () => {
    setOpen(false);
  };

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const profileData = {
        name: data.name,
        profileImage: image,
        userId: userId,
      };
      if (!profile) {
        await axios.post("/api/profiles", profileData);
        toast.success("profile Created successfully");
        router.refresh();
      } else {
        await axios.patch(`/api/profiles/${profile.id}`, profileData);
        toast.success("profile Updated successfully");
        router.refresh();
      }
      handleClose();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" onClick={() => setOpen(true)}>
          {icon ? (
            <Pencil className={"w-5 h-5"} />
          ) : (
            <>
              {" "}
              <PlusCircle className={"w-4 h-4"} />
              <span className="ms-2">{title}</span>
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <Separator />
          <DialogDescription>
            Profiles help personalize Amazon for everyone sharing this account.
          </DialogDescription>
        </DialogHeader>
        {image ? (
          <div className="relative flex items-center justify-center">
            <Image
              src={image}
              alt="profile Photo"
              width={50}
              height={50}
              className="rounded-full"
              style={{ aspectRatio: "1/1" }}
            />
          </div>
        ) : (
          <div className="relative flex items-center justify-center">
            <Image
              src={unknown}
              alt="profile Photo"
              width={50}
              height={50}
              className="rounded-full"
              style={{ aspectRatio: "1/1" }}
            />
          </div>
        )}
        <div>
          <FileUpload
            endpoint="imageUploader"
            onChange={(url) => {
              if (url) {
                setImage(url);
              }
            }}
            setDisabled={setDisabled}
          />
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-center"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormControl>
                  <Input
                    type="text"
                    id="name"
                    {...field}
                    className="rounded-md focus-visible:bg-none"
                  />
                </FormControl>
              )}
            />
            <Button
              disabled={isSubmitting || !isValid || disabled}
              type="submit"
              className="rounded-md"
            >
              {isSubmitting
                ? profile
                  ? "Updating Profile..."
                  : "Creating Profile..."
                : "Continue"}
            </Button>
          </form>
        </Form>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
