"use client"
import { Products, Review } from "@prisma/client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type WishlistContextProps = {
  wishlistProducts: Products[] & {
    reviews: Review[] | null;
    images: {
        image: string;
        color: string;
    }[];
  } | null;
  handleAddToWishList: (product: Products) => Products[];
  handleRemoveProductFromWishlist: (index: number) => Products[];
};

export const WishlistContext = createContext<WishlistContextProps | null>(null);

export const WishlistContextProvider = (props: any) => {
  const [wishlistProducts, setWishlistProducts] = useState<Products[] | null>(
    null
  );

  useEffect(() => {
    const wishlistItems: any = localStorage.getItem("wishlistItems");
    if (wishlistItems) {
      const cProduct: Products[] | null = JSON.parse(wishlistItems);
      setWishlistProducts(cProduct);
    }
  }, []);

  const handleAddToWishList = useCallback(
    (product: Products) => {
      setWishlistProducts((prev: Products[] | null) => {
        if (prev) {
          // Check if the product already exists in the wishlist
          const isProductInWishlist = prev.some((wishlistProduct) => wishlistProduct.id === product.id);
          if (isProductInWishlist) {
            // If the product is already in the wishlist, return the current wishlist without modification
            return prev;
          } else {
            // If the product is not in the wishlist, add it
            const updatedWishlist = [...prev, product];
            localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlist));
            return updatedWishlist;
          }
        } else {
          // If wishlist is null, initialize it with the product
          const updatedWishlist = [product];
          localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlist));
          return updatedWishlist;
        }
      });
    },
    [setWishlistProducts]
  );
  
  const handleRemoveProductFromWishlist = useCallback(
    (index: number) => {
      setWishlistProducts((prev: Products[] | null) => {
        if (prev) {
          const updatedWishlist = [...prev];
          updatedWishlist.splice(index, 1); // Remove the product at the specified index
          localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlist));
          return updatedWishlist;
        }
        return prev;
      });
    },
    [setWishlistProducts]
  );

  const value = useMemo(
    () => ({
      wishlistProducts,
      handleAddToWishList,
      handleRemoveProductFromWishlist,
    }),
    [wishlistProducts, handleAddToWishList, handleRemoveProductFromWishlist]
  );

  return <WishlistContext.Provider value={value} {...props} />;
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context)
    throw new Error(
      "useWishlist must be used within a WishlistContextProvider"
    );
  return context;
};
