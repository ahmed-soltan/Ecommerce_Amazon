import FileUpload from "@/components/fileUpload";
import Image from "next/image";

type ProductImageProps = {
  handleProductImage: (image: string) => void;
  image: string;
};
const ProductImage = ({ handleProductImage , image}: ProductImageProps) => {
  return (
    <div className="flex flex-col gap-4 items-start">
        {image && (
            <Image src={image} alt="Store Logo" width={70} height={70} />
        )}
      <FileUpload
        endpoint="imageUploader"
        onChange={(url) => {
          if (url) {
            handleProductImage(url);
          }
        }}
      />
    </div>
  );
};

export default ProductImage;
