import { Button } from "@/components/ui/button";

type CancelButtonProps = {
  isLoading: boolean;
  onCLick: () => void;
  variant: "link" | "default" | "secondary" | "destructive" | "outline" | "ghost" | "amazonBtn" | null | undefined
};
const CancelOrderButton = ({ onCLick, isLoading , variant}: CancelButtonProps) => {
  return (
    <Button variant={variant} onClick={onCLick} disabled={isLoading} size={"sm"}>
      Cancel Order
    </Button>
  );
};

export default CancelOrderButton;
