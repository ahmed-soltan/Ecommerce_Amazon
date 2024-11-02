import { Button } from "@/components/ui/button";
import { cartProductType } from "./ProductContainerDetails";

type SizesProps = {
  handleSelectSizes: (size: string) => void;
  cartProduct: cartProductType;
  sizes: string[] | undefined;
};
const SetSizes = ({ handleSelectSizes, cartProduct, sizes }: SizesProps) => {
  return (
    <div className="flex items-center justify-start gap-3 flex-wrap">
      
      <span className="font-semibold">Sizes : </span>
      {sizes && sizes.map((size: string) => (
        <Button
          onClick={() => handleSelectSizes(size)}
          variant="ghost"
          key={size}
          className={`border-[1px] rounded-md ${
            cartProduct.sizes?.includes(size)
              ? "border-slate-900 text-slate-900"
              : ""
          }`}
        >
          {size}
        </Button>
      ))}
    </div>
  );
};

export default SetSizes;
