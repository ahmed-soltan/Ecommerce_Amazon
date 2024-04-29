"use client";
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
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { LucideIcon, Pencil, PlusCircle } from "lucide-react";
import { Profile } from "@prisma/client";
import { Form, FormControl, FormField } from "@/components/ui/form";
import FileUpload from "@/components/fileUpload";
import { useState } from "react";
import Image from "next/image";
import unknown from "../../../public/unknown.jpeg";
const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
});

type AddProfileProps = {
  icon?: boolean;
  title: string;
  profile?: Profile;
  userId:string
};
export const AddProfile = ({ icon, title, profile , userId }: AddProfileProps) => {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(
    profile?.profileImage || null
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: profile?.name || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
        const profileData ={
            name: data.name,
            profileImage: image,
            userId: userId
        } 
        if(!profile){
            await axios.post('/api/profiles' , profileData);
            toast.success("profile Created successfully");
            router.refresh();
          }else{
            await axios.patch(`/api/profiles/${profile.id}` , profileData);
            toast.success("profile Updated successfully");
            router.refresh();
          }
    } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
    }finally{
          router.push('/')
    }
  }; 

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
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
              disabled={isSubmitting || !isValid}
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
