import { Button } from "@/components/ui/button";
import { cartProductType } from "./ProductContainerDetails";

type QuantityProps = {
  cartCounter: number;
  handleQuantityIncrease: () => void;
  handleQuantityDecrease: () => void;
  cartProduct: cartProductType;
  isLoading: boolean;
};
const SetQuantity = ({
  isLoading,
  cartCounter,
  handleQuantityIncrease,
  handleQuantityDecrease,
  cartProduct,
}: QuantityProps) => {
  return (
    <div className="flex items-center justify-start gap-3">
            <span className="font-medium text-lg text-slate-800">
              Quantity : 
            </span>
      <Button
        onClick={handleQuantityDecrease}
        variant={"ghost"}
        className="border-[1px] rounded-md"
        disabled={isLoading}
        >
        -
      </Button>
      <p>{cartCounter}</p>
      <Button
        onClick={handleQuantityIncrease}
        variant={"ghost"}
        className="border-[1px] rounded-md"
        disabled={isLoading}
      >
        +
      </Button>
    </div>
  );
};

export default SetQuantity;
