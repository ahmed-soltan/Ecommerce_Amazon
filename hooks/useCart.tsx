import { cartProductType } from "@/app/(root)/product/[productId]/_components/ProductContainerDetails";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import toast from "react-hot-toast";

type CartContextProps = {
  cartQtyTotal: number;
  cartProducts: cartProductType[] | null;
  savedProduct: cartProductType[] | null;
  handleAddToCartProduct: (product: cartProductType) => void;
  handleRemoverProductFromCart: (index: number) => void;
  handleRemoverProductFromSavedLater: (index: number) => void;
  handleQuantityIncrease: (index: number) => void;
  handleQuantityDecrease: (index: number) => void;
  ClearCart: () => void;
  cartAmountTotal: number;
  handleSaveLater: (index: number) => void;
};

export const cartContext = createContext<CartContextProps | null>(null);

export const CartContextProvider = (props: any) => {
  const [cartQtyTotal, setCartQtyTotal] = useState(0);
  const [cartAmountTotal, setCartAmountTotal] = useState(0);
  const [cartProducts, setCartProducts] = useState<cartProductType[] | null>(
    null
  );
  const [savedProduct, setSavedProduct] = useState<cartProductType[] | null>(
   null
);

  useEffect(() => {
    const cartItems: any = localStorage.getItem("cartItems");
    const savedItems : any = localStorage.getItem("savedItems");
    const cProduct: cartProductType[] | null = JSON.parse(cartItems);
    const cSavedProducts :cartProductType[] | null = JSON.parse(savedItems);
    setSavedProduct(cSavedProducts);
    setCartProducts(cProduct);
    setCartQtyTotal(cProduct ? cProduct.length : 0);
  }, []);
  
  const handleAddToCartProduct = useCallback(
    (product: cartProductType) => {
      setCartProducts((prev: cartProductType[] | null) => {
        const updatedCart = prev ? [...prev, product] : [product];
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        setCartQtyTotal(updatedCart.length);
        return updatedCart;
      });
    },
    [setCartProducts, setCartQtyTotal]
  );
  
  


  const handleSaveLater = useCallback(
    (index: number) => {
      setCartProducts((prevCart: cartProductType[] | null) => {
        if (prevCart) {
          // Remove the product being saved for later
          const updatedCart = prevCart.filter(
            (item: cartProductType, currentIndex: number) => currentIndex !== index
          );
  
          localStorage.setItem("cartItems", JSON.stringify(updatedCart));
          setCartQtyTotal(updatedCart.length);
  
          return updatedCart;
        }
        return prevCart;
      });
  
      setSavedProduct((prevSaved: cartProductType[] | null) => {
        if (cartProducts && cartProducts[index]) {
          // Add the product to savedProducts
          const productToSave = cartProducts[index];
          const updatedSaved = prevSaved ? [...prevSaved, productToSave] : [productToSave];
          localStorage.setItem("savedItems", JSON.stringify(updatedSaved));
          return updatedSaved;
        }
        return prevSaved;
      });
    },
    [cartProducts]
  );
  

const handleRemoverProductFromCart = useCallback(
  (index: number) => {
    setCartProducts((prev: cartProductType[] | null) => {
      if (prev) {
        const updatedCart = [...prev];
        updatedCart.splice(index, 1); // Remove the product at the specified index
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        setCartQtyTotal(updatedCart.length);
        return updatedCart;
      }
      return prev;
    });
  },
  [cartProducts]
);

const handleRemoverProductFromSavedLater = useCallback(
  (index: number) => {
    setSavedProduct((prev: cartProductType[] | null) => {
      if (prev) {
        // Remove the product from savedProducts based on index
        const updatedSaved = prev.filter(
          (item: cartProductType, currentIndex: number) => currentIndex !== index
        );
        localStorage.setItem("savedItems", JSON.stringify(updatedSaved));
        return updatedSaved;
      }
      return prev;
    });
  },
  [savedProduct]
);


  const handleQuantityIncrease = useCallback(
    (index: number) => {
      if (cartProducts) {
        const updatedCart = [...cartProducts];
        const product = updatedCart[index];
        if (product.quantity === 99) {
          return toast.error("Maximum quantity Reached");
        }
        product.quantity += 1;
        setCartProducts(updatedCart);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );
  
  const handleQuantityDecrease = useCallback(
    (index: number) => {
      if (cartProducts) {
        const updatedCart = [...cartProducts];
        const product = updatedCart[index];
        if (product.quantity === 1) {
          return;
        }
        product.quantity -= 1;
        setCartProducts(updatedCart);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );
  

  const ClearCart = useCallback(() => {
    setCartQtyTotal(0);
    setCartProducts([]);
    localStorage.setItem("cartItems", JSON.stringify(null));
  }, [cartProducts]);

  useEffect(() => {
    const CartTotal = () => {
      if (cartProducts) {
        const { total, qty } = cartProducts.reduce(
          (acc, item) => {
            return {
              total: acc.total + item.priceAfterDiscount * item.quantity,
              qty: acc.qty + item.quantity,
            };
          },
          {
            total: 0,
            qty: 0,
          }
        );
        setCartQtyTotal(qty);
        setCartAmountTotal(total);
      }
    };
    CartTotal();
  }, [cartProducts]);

  const value = useMemo(
    () => ({
      cartQtyTotal,
      cartAmountTotal,
      cartProducts,
      handleAddToCartProduct,
      handleRemoverProductFromCart,
      handleQuantityIncrease,
      handleQuantityDecrease,
      ClearCart,
      handleSaveLater,
      savedProduct,
      handleRemoverProductFromSavedLater
    }),
    [
      cartQtyTotal,
      cartAmountTotal,
      cartProducts,
      handleAddToCartProduct,
      handleRemoverProductFromCart,
      handleQuantityIncrease,
      handleQuantityDecrease,
      ClearCart,
      handleSaveLater,
      savedProduct,
      handleRemoverProductFromSavedLater
    ]
  );

  return <cartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(cartContext);
  if (!context)
    throw new Error("useCart must be used within a CartContextProvider");
  return context;
};
