"use client";

import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import FileUpload from "@/components/fileUpload";
import { Image } from "@prisma/client";
import { Input } from "@/components/ui/input";

type SelectColorProps = {
  item: {
    color:string,
    colorCode:string,
    image:string|null
};
  addImageToState: (value: {
    color:string,
    colorCode:string,
    image:string|null
}) => void;
  isProductCreated: boolean;
};
const SelectColor = ({
  item,
  addImageToState,
  isProductCreated,
}: SelectColorProps) => {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (isProductCreated) {
      setIsSelected(false);
    }
  }, [isProductCreated]);

  const handleCheck = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSelected(e.target.checked);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 overflow-y-auto border-b-[1.2px] border-slate-200 items-center p-2">
      <div className="flex flex-row gap-2 items-center h-[60px]">
        <Input
          id={item.color}
          type="checkbox"
          checked={isSelected}
          onChange={handleCheck}
          className="h-[20px] w-[20px] cursor-pointer"
        />
        <div
          className={`w-[20px] h-[20px] rounded-full border-slate-900 p-1`}
          style={{ backgroundColor: item.color }}
        ></div>
        <label htmlFor={item.color} className="font-medium cursor-pointer">
          {item.color}
        </label>
      </div>
      <>
        {isSelected && (
          <div className="col-span-2 text-center flex flex-row items-center justify-start border-dashed ">
            <FileUpload
              endpoint="imageUploader"
              onChange={(url) => {
                if (url) {
                  addImageToState({ ...item, image: url });
                  setIsSelected(false)
                }
              }}
            />
          </div>
        )}
      </>
    </div>
  );
};

export default SelectColor;
