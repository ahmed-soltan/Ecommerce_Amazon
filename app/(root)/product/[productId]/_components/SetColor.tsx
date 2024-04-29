import { Button } from "@/components/ui/button";
import { cartProductType } from "./ProductContainerDetails";

type SelectColorType = {
  images: {
    color: string;
    colorCode: string;
    image: string ;
  }[];
  cartProduct: cartProductType;
  handleColorSelect: (image: {
    color: string;
    colorCode: string;
    image: string ;
  }) => void;
};
const SetColor = ({
  images,
  cartProduct,
  handleColorSelect,
}: SelectColorType) => {
  return (
    <div className="flex items-center justify-start">
      {images &&
        images.map(
          (image: {
            color: string;
            colorCode: string;
            image: string;
          }) => (
            <div
              className={`flex items-center justify-center p-1 rounded-full w-[35px] h-[35px] ${
                cartProduct.selectedImage.color === image.color
                  ? "border-[1px] border-cyan-300"
                  : "border-none"
              }`}
              key={image.image}
              onClick={() => handleColorSelect(image)}
            >
              <button
                className={`rounded-full w-full h-full`}
                style={{ backgroundColor: image.color }}
              ></button>
            </div>
          )
        )}
    </div>
  );
};

export default SetColor;
