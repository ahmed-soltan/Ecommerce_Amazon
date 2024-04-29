"use client";
import { FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react"; // Import useState hook

type ProductSizesProps = {
  label: string;
  onClick: (value: string) => void;
  value: string;
  checked?: boolean;
};

const ProductSizes = ({ label, onClick, value , checked}: ProductSizesProps) => {
  const [isChecked, setIsChecked] = useState(checked||false); // State to track checkbox status

  const handleClick = () => {
    setIsChecked(!isChecked); // Toggle checkbox status
    onClick(value); // Call onClick callback with the size value
  };

  return (
    <div  className="flex items-center gap-2">
      <FormControl onClick={handleClick}>
        <Input
          readOnly
          type="checkbox"
          className="w-5 h-5"
          id={value}
          value={value}
          checked={isChecked} // Set checked attribute based on state
        />
      </FormControl>
      <Label htmlFor={value}>{label}</Label>
    </div>
  );
};

export default ProductSizes;
