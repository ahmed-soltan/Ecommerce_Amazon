import { getCurrentUser } from "@/actions/getCurrentUser";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing();
const handleAuth =async () => {
    const user= await getCurrentUser();
    if (!user) {
      throw new Error("UnAuthorized");
    }
    return user;
  };
export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
  .middleware(() => handleAuth())
  .onUploadComplete(() => {}),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;