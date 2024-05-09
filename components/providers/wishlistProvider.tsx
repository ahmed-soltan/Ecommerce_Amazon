"use client"

import { WishlistContextProvider } from "@/hooks/useWishList"


const WishListProvider = ({children}:{children:React.ReactNode}) => {
  return (
    <WishlistContextProvider>
        {children}
    </WishlistContextProvider>
  )
}

export default WishListProvider