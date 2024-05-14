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

type BrowsingHistoryContextProps = {
  BrowsingHistoryProducts: Products[] & {
    reviews: Review[] | null;
    images: {
        image: string;
        color: string;
    }[];
  } | null;
  handleAddToBrowsingHistory: (product: Products) => Products[];
  handleRemoveProductFromBrowsingHistory: (index: number) => Products[];
};

export const BrowsingHistoryContext = createContext<BrowsingHistoryContextProps | null>(null);

export const BrowsingHistoryContextProvider = (props: any) => {
  const [BrowsingHistoryProducts, setBrowsingHistoryProducts] = useState<Products[] | null>(
    null
  );

  useEffect(() => {
    // Check if browsing history data exists in localStorage when the component mounts
    const BrowsingHistoryItems: any = localStorage.getItem("BrowsingHistoryItems");
    if (BrowsingHistoryItems) {
      const cProduct: Products[] | null = JSON.parse(BrowsingHistoryItems);
      setBrowsingHistoryProducts(cProduct);
    }
  }, []);
  

  const handleAddToBrowsingHistory = useCallback(
    (product: Products) => {
      setBrowsingHistoryProducts((prev: Products[] | null) => {
        if (prev) {
          const isProductInHistory = prev.some((historyProduct) => historyProduct.id === product.id);
          if (isProductInHistory) {
            return prev;
          } else {
            const updatedHistory = [...prev, product];
            localStorage.setItem("BrowsingHistoryItems", JSON.stringify(updatedHistory));
            console.log("Updated browsing history:", updatedHistory);
            return updatedHistory;
          }
        } else {
          const updatedHistory = [product];
          localStorage.setItem("BrowsingHistoryItems", JSON.stringify(updatedHistory));
          console.log("Initialized browsing history:", updatedHistory);
          return updatedHistory;
        }
      });
    },
    [setBrowsingHistoryProducts]
  );
  
  

  const handleRemoveProductFromBrowsingHistory = useCallback(
    (index: number) => {
      setBrowsingHistoryProducts((prev: Products[] | null) => {
        if (prev) {
          const updatedBrowsingHistory = [...prev];
          updatedBrowsingHistory.splice(index, 1); // Remove the product at the specified index
          localStorage.setItem("BrowsingHistoryItems", JSON.stringify(updatedBrowsingHistory));
          return updatedBrowsingHistory;
        }
        return prev;
      });
    },
    [setBrowsingHistoryProducts]
  );

  const value = useMemo(
    () => ({
      BrowsingHistoryProducts,
      handleAddToBrowsingHistory,
      handleRemoveProductFromBrowsingHistory,
    }),
    [BrowsingHistoryProducts, handleAddToBrowsingHistory, handleRemoveProductFromBrowsingHistory]
  );

  return <BrowsingHistoryContext.Provider value={value} {...props} />;
};

export const useBrowsingHistory = () => {
  const context = useContext(BrowsingHistoryContext);
  if (!context)
    throw new Error(
      "useBrowsingHistory must be used within a BrowsingHistoryContextProvider"
    );
  return context;
};
