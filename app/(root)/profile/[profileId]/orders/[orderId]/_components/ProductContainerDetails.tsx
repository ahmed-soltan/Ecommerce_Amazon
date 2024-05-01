"use client";
import { Products, Profile, Review, User } from "@prisma/client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatPrice";
import { Rating } from "@mui/material";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import { useCart } from "@/hooks/useCart";
import toast from "react-hot-toast";
import Image from "next/image";


const ProductContainerDetails = ({
  product,
  user,
}) => {
  const [isLoading, setIsLoading] = useState(false);



  

  return (
    <div className="flex flex-col gap-4 bg-white p-2 rounded-md">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
       <Image src={product.selectedImage.image} alt="order Image" width={100} height={100}/>
        <div className="flex flex-col gap-3 items-start">
          <h2 className="text-slate-800 text-3xl font-medium">
            {product?.name}
          </h2>
         
          <div className="text-justify flex items-center gap-2">
            <span className="font-medium text-lg text-slate-800">Price : </span>
           
             {formatPrice(product.price)}
          </div>
          {product.discount && product.discount > 0 && (
            <div className="text-justify flex items-center gap-2">
              <span className="font-medium text-lg text-slate-800">
                Discount :{" "}
              </span>
              <div className="flex items-center gap-2">
                <h1 className="bg-rose-600 font-bold text-xl p-2 text-white">
                  {product.discount}% OFF
                </h1>
              </div>
            </div>
          )}
          <div className="text-slate-700">
            <span className="font-medium text-lg text-slate-800">
              CATEGORY :{" "}
            </span>
            {product.category}
          </div>
          <div className="text-slate-700">
            <span className="font-medium text-lg text-slate-800 ">
              BRAND :{" "}
            </span>
            {product.brand}
          </div>
                 </div>
      </div>

     
    </div>
  );
};

export default ProductContainerDetails;
