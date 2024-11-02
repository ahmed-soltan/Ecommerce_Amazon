import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { cartProductType } from "../../product/[productId]/_components/ProductContainerDetails";
import { useCart } from "@/hooks/useCart";

type CheckoutButtonProps = {
  cartProducts: cartProductType[];
  cartProductLength: number;
  totalAmount: number;
  panned:boolean | undefined;
};
const CheckoutButton = ({
  cartProducts,
  cartProductLength,
  totalAmount,
  panned
}: CheckoutButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const {ClearCart} = useCart()
  const onClick = async () => {
    try {
      const orderDetails = {
        products: cartProducts,
        amount:totalAmount
      };
      setIsLoading(true);
      const response = await axios.post(`/api/checkout`, orderDetails);
      ClearCart()
      window.location.assign(response.data.url);
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      className="w-full"
      variant={"amazonBtn"}
      disabled={isLoading || cartProductLength === 0 || panned}
      onClick={onClick}
    >
      Proceed To Checkout
    </Button>
  );
};

export default CheckoutButton;
