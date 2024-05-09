"use client"

import { BrowsingHistoryContextProvider } from "@/hooks/useBrowsingHistory"


const WishListProvider = ({children}:{children:React.ReactNode}) => {
  return (
    <BrowsingHistoryContextProvider>
        {children}
    </BrowsingHistoryContextProvider>
  )
}

export default WishListProvider