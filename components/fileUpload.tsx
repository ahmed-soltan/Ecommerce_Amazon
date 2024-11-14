"use client";

import toast from "react-hot-toast";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadButton } from "@/lib/uploadthing";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
  setDisabled?: (disabled: boolean) => void;
}

const FileUpload = ({ onChange, endpoint, setDisabled }: FileUploadProps) => {
  return (
    <UploadButton
      endpoint={endpoint}
      onUploadBegin={() => {
        if (setDisabled) setDisabled(true);
      }}
      onClientUploadComplete={(res) => {
        if (setDisabled) setDisabled(false);
        onChange(res?.[0]?.url);
      }}
      
      onUploadError={(error: Error) => {
        if (setDisabled) setDisabled(false);
        toast.error(`ERROR! ${error?.message}`);
      }}
    />
  );
};

export default FileUpload;
