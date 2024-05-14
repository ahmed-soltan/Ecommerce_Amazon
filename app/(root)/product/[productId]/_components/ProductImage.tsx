import { Products } from "@prisma/client";
import Image from "next/image";
import { cartProductType } from "./ProductContainerDetails";

type productImageProps = {
  cartProduct: cartProductType;
  product: Products;
  handleColorSelect: (image: {
    color: string;
    image: string;
    colorCode: string;
  }) => void;
};

const ProductImage = ({
  cartProduct,
  product,
  handleColorSelect,
}: productImageProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-3 h-[500px] w-full">
      <div className="border-2 flex md:flex-col items-start p-2 gap-2 overflow-auto w-full">
        {product.images.map(
          (image: { color: string; image: string; colorCode: string }) => {
            return (
              <div
                className={`w-[100px] p-2 flex flex-col items-start cursor-pointer gap-2 border-[1px] rounded-md flex-wrap ${
                  image.color === cartProduct.selectedImage.color
                    ? "border-cyan-400 border-[2px]"
                    : ""
                }`}
                key={image.image}
              >
                <div className="relative h-[100px] w-full z-0">
                  <Image
                    src={image.image}
                    alt={product.category || ""}
                    fill
                    className="object-fit z-0"
                    onClick={() => handleColorSelect(image)}
                  />
                </div>
              </div>
            );
          }
        )}
      </div>
      <div className="col-span-1 md:col-span-5 border-2 relative min-h-[300px]">
        <Image
          src={cartProduct?.selectedImage.image}
          alt={product.category || ""}
          fill
          className="object-fit"
        />
      </div>
    </div>
  );
};

export default ProductImage;
