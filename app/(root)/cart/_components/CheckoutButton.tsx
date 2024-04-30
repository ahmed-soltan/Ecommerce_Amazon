import { Button } from "@/components/ui/button"
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const CheckoutButton = () => {
    const [isLoading , setIsLoading] = useState(false)
    const onClick = async () => {
        try {
          setIsLoading(true);
          const response = await axios.post(`/api/profiles/${profileId}/checkout`);
          console.log(response.data);
          window.location.assign(response.data.url);
        } catch (error) {
          console.log(error);
          toast.error("Something went Wrong");
        } finally {
          setIsLoading(false);
        }
      };
  return (
    <Button className="w-full" variant={"amazonBtn"} disabled={isLoading}>Proceed To Checkout</Button>
  )
}

export default CheckoutButton