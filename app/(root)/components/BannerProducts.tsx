"use client"

import { categories } from "@/app/(dashboard)/vendor/[vendorId]/create-product/_components/AddProductsForm"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const BannerProducts = ({products}:{products:any[]}) => {
  return (
    <div className="p-5 hidden md:flex items-center flex-wrap gap-4 ">
    {
      categories.map((category)=>{
        const product = products?.find((product:any) => product.category===category.label)
        console.log(product)
        if(!product || category.label==="Clothes"){
          return null
        }
        const ProductPhoto = product&& category.label==="Clothes" ? product.images[1].image:product.images[0].image
        return (
          <div className="p-4 bg-white w-[400px] h-[450px] flex items-start flex-col justify-between gap-4 rounded-md" key={category.label}>
          <h1 className="text-xl font-bold text-slate-900 pl-2">{category.label}</h1>
          <div className="relative mt-4">
            <Image
              src={ProductPhoto!}
              alt={`Deals on ${category.label}`}
              width={300}
              height={300}
              className="min-h-[250px] w-full"
              style={{aspectRatio:'1/1'}}
            />
          </div>
          <Link href={`/products?key=${category.label}&page=1`}>
            <Button variant={"link"}>Shop Now</Button>
          </Link>
        </div>
        )
      })
    }
        
      </div>
  )
}

export default BannerProducts