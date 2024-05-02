import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

type ButtonProps = {
  isLoading: boolean;
  onClick: () => void;
  variant: "link" | "default" | "secondary" | "destructive" | "outline" | "ghost" | "amazonBtn" | "success" | null | undefined
  title:string
  icon?:LucideIcon
};
const OrderButton = ({ onClick, isLoading , variant , title , icon:Icon}: ButtonProps) => {
  return (
    <Button variant={variant} onClick={onClick} disabled={isLoading} size={"sm"}>
      {Icon &&
      <Icon className="w-5 h-5 mr-2"/>
      }
     {title}
    </Button>
  );
};

export default OrderButton;
