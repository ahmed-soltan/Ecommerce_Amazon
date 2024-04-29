import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import FileUpload from "@/components/fileUpload";
import Image from "next/image";

const Step4 = ({
  form,
  handleSetImage,
  vendorImage
}: {
  handleSetImage:(image:string)=>void,
  form:any,
  vendorImage?:string
}) => {
  const [image , setImage] = useState('')
  return (
    <div className="flex items-start flex-col w-full gap-3">
      <div className="flex flex-col items-start justify-start gap-4 w-full">
        <div className="flex flex-col items-start gap-2">
          <Label>Store Logo</Label>
          {image && (
            <Image src={image} alt="Store Logo" width={130} height={130}/>
          )}
          {vendorImage && (
            <Image src={vendorImage} alt="Store Logo" width={130} height={130}/>
          )}
          <div>
          <FileUpload
             endpoint="imageUploader"
             onChange={(url) => {
               if (url) {
                handleSetImage(url);
                setImage(url);
               }
             }}
          />
           
          </div>
        </div>
      </div>
      <div className="w-full">
      <FormField
          name="storeName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. 'ABC' " />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="w-full">
      <FormField
          name="storeDescription"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store Description</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="e.g. 'This Store is Selling....'" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default Step4;
