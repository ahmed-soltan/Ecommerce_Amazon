"use client";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { XCircle } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import FileUpload from "@/components/fileUpload";
import CategoryTitle from "./CategoryTitle";

type AddCategoryFormProps = {
  vendorId: string;
};

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Product name must be at least 3 characters.",
  }),
});

const AddCategoryForm = ({ vendorId }: AddCategoryFormProps) => {
  const [image, setImage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const router = useRouter();
  const { getValues } = form;
  const { isSubmitting, isValid } = form.formState;

  const handleAddImage = (item: string) => {
    setImage(item);
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const requiredField = [getValues("name"), image];

  const totalFields = requiredField.length;
  const completedFields = requiredField.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredField.every(Boolean);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const categoryData = {
      ...data,
      image,
    };
    try {
      await axios.post(`/api/vendors/${vendorId}/categories`, categoryData);
      toast.success("Category Created successfully");
      router.refresh();
      router.push(`/vendor/${vendorId}/manage-categories`);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <div className="p-6">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Category Creation</h1>
          <span className="text-sm text-slate-700">
            Complete All Fields {completionText}
          </span>
          <Separator />
        </div>
        <Form {...form}>
          <form
            className="space-y-4 w-full mt-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex flex-col items-start gap-5">
              <h1>Category Image</h1>
              {image && (
                <div className="flex items-start gap-1">
                  <Image
                    src={image!}
                    alt="image"
                    width={80}
                    height={80}
                    className="max-h-[100px]"
                  />
                  <XCircle
                    className="w-4 h-4 cursor-pointer"
                    onClick={handleRemoveImage}
                  />
                </div>
              )}
              <div className="col-span-2 text-center flex flex-row items-center justify-start border-dashed">
                <FileUpload
                  endpoint="imageUploader"
                  onChange={(url) => {
                    if (url) {
                      handleAddImage(url);
                    }
                  }}
                />
              </div>
            </div>
            <CategoryTitle form={form} />

            <Button
              variant={"amazonBtn"}
              disabled={!isComplete || !isValid || isSubmitting}
            >
              Add Category
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default AddCategoryForm;
