"use client"
import ProductCard from '@/components/ProductCard'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useWishlist } from '@/hooks/useWishList'
import { Products, Review } from '@prisma/client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const WishlistProducts = () => {
    const {wishlistProducts , handleRemoveProductFromWishlist} = useWishlist()
    
    
  return (
    <div className='flex flex-col items-start gap-5 bg-white p-5'>
        <h1 className='text-slate-800 font-medium text-2xl'>
            Your WishList Products
        </h1>
        <Separator/>
            {wishlistProducts && wishlistProducts.length>0?(
                <div className={"flex flex-wrap items-start gap-3"}>
                    {wishlistProducts.map((product:Products , index:number)=>{
                        return (
                            <div  key={product.id}>

                            {/*@ts-ignore*/}
                           <ProductCard product={product}/>
                           <Button className='w-full' variant={"outline"} onClick={()=>handleRemoveProductFromWishlist(index)}>Delete</Button>
                            </div>
                        )
                    })}
                </div>
            ):(
                <div className={"flex flex-col items-start gap-3"}>
                    <p className={"text-slate-700 font-medium"}>You Haven&apos;t Added Any products To Your WishList</p>
                    <Link href="/products?&page=1">
                        <Button variant={"amazonBtn"}>Start Shopping</Button>
                    </Link>
                </div>
            )}
    </div>
  )
}

export default WishlistProducts