"use client"

import { categories } from "@/app/(dashboard)/vendor/[vendorId]/create-product/_components/AddProductsForm"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const BannerProducts = ({products}:{products:any[]}) => {
  return (
    <div className="flex items-center gap-4 w-full my-2 lg:flex-wrap overflow-x-auto">
    {
      categories.map((category)=>{
        const product = products?.find((product:any) => product.category===category.label)
        console.log(product)
        if(!product || category.label==="Clothes"){
          return null
        }
        const ProductPhoto = product&& category.label==="Clothes" ? product.images[1].image:product.images[0].image
        return (
          <div className="p-4 bg-white min-w-[300px] lg:min-w-[310px] xl:min-w-[330px] h-[400px] flex items-start flex-col justify-between gap-4 rounded-md" key={category.label}>
          <h1 className="text-xl font-bold text-slate-900 pl-2">{category.label}</h1>
          <div className="relative mt-4 w-full h-full">
            <Image
              src={ProductPhoto!}
              alt={`Deals on ${category.label}`}
             fill
              className="max-h-[250px] w-full"
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