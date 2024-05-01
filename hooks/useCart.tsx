import { cartProductType } from "@/app/(root)/product/[productId]/_components/ProductContainerDetails";
import { Products } from "@prisma/client";
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
  handleRemoverProductFromCart: (product: cartProductType) => void;
  handleRemoverProductFromSavedLater: (product: cartProductType) => void;
  handleQuantityIncrease: (product: cartProductType) => void;
  handleQuantityDecrease: (product: cartProductType) => void;
  ClearCart: () => void;
  cartAmountTotal: number;
  handleSaveLater: (product: cartProductType) => void;
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
        const isProductExist = prev?.find(
          (item: cartProductType) => item.productId === product.productId
        );

        // Check if the product is also in the savedProduct
        const isProductSaved = savedProduct?.find(
          (item: cartProductType) => item.productId === product.productId
        );

        // Remove the product from savedProduct if found
        if (isProductSaved) {
          setSavedProduct((prevSaved: cartProductType[] | null) => {
            const updatedSaved = prevSaved?.filter(
              (item: cartProductType) => item.productId !== product.productId
            );
            localStorage.setItem("savedItems", JSON.stringify(updatedSaved));
            return updatedSaved || prevSaved;
          });
        }

        if (isProductExist) {
          // If the product is already in the cart, increase its quantity
          const updatedCart = prev?.map((item: cartProductType) => {
            if (item.productId === product.productId) {
              return {
                ...item,
                quantity: item.quantity + product.quantity,
              };
            }
            return item;
          });
          if (updatedCart) {
            localStorage.setItem("cartItems", JSON.stringify(updatedCart));
            setCartQtyTotal(updatedCart.length);
          }
          return updatedCart || prev;
        } else {
          // If the product is not in the cart, add it
          const updatedCart = prev
            ? [...prev, { ...product, quantity: product.quantity }]
            : [{ ...product, quantity: product.quantity }];
          localStorage.setItem("cartItems", JSON.stringify(updatedCart));
          setCartQtyTotal(updatedCart.length);
          return updatedCart;
        }
      });
    },
    [cartProducts, savedProduct]
  );


  const handleSaveLater = useCallback(
    (product: cartProductType) => {
        setCartProducts((prevCart: cartProductType[] | null) => {
            // Filter out the product being saved for later
            const updatedCart = prevCart?.filter(
                (item: cartProductType) => item.productId !== product.productId
            );

            if (updatedCart) {
                localStorage.setItem("cartItems", JSON.stringify(updatedCart));
                setCartQtyTotal(updatedCart.length);
            }

            return updatedCart || prevCart;
        });

        setSavedProduct((prevSaved: cartProductType[] | null) => {
            // Add the product to savedProducts
            const updatedSaved = prevSaved ? [...prevSaved, product] : [product];
            localStorage.setItem("savedItems", JSON.stringify(updatedSaved));
            return updatedSaved;
        });
    },
    [cartProducts]
);

  const handleRemoverProductFromCart = useCallback(
    (product: cartProductType) => {
      setCartProducts((prev: cartProductType[] | null) => {
        const updateCart = prev
          ? prev.filter(
              (item: cartProductType) => item.productId !== product.productId
            )
          : prev;
        if (cartProducts) {
          setCartProducts(updateCart);
          localStorage.setItem("cartItems", JSON.stringify(updateCart));
          setCartQtyTotal(updateCart?.length || 0);
        }
        return updateCart;
      });
    },
    [cartProducts]
  );
  const handleRemoverProductFromSavedLater = useCallback(
    (product: cartProductType) => {
      setSavedProduct((prev: cartProductType[] | null) => {
        const savedProducts = prev
          ? prev.filter(
              (item: cartProductType) => item.productId !== product.productId
            )
          : prev;
        if (savedProducts) {
          setSavedProduct(savedProducts);
          localStorage.setItem("savedItems", JSON.stringify(savedProducts));
        }
        return savedProducts;
      });
    },
    [savedProduct]
  );

  const handleQuantityIncrease = useCallback(
    (product: cartProductType) => {
      let updateCart;

      if (product.quantity === 99) {
        return toast.error("Maximum quantity Reached");
      }
      if (cartProducts) {
        updateCart = [...cartProducts];
        const existProduct = cartProducts.findIndex(
          (item) => item.productId === product.productId
        );
        if (existProduct > -1) {
          updateCart[existProduct].quantity =
            updateCart[existProduct].quantity + 1;
        }
        setCartProducts(updateCart);
        localStorage.setItem("cartItems", JSON.stringify(updateCart));
      }
    },
    [cartProducts]
  );

  const handleQuantityDecrease = useCallback(
    (product: cartProductType) => {
      let updateCart;

      if (product.quantity === 1) {
        return;
      }
      if (cartProducts) {
        updateCart = [...cartProducts];
        const existProduct = cartProducts.findIndex(
          (item) => item.productId === product.productId
        );
        if (existProduct > -1) {
          updateCart[existProduct].quantity =
            updateCart[existProduct].quantity - 1;
        }
        setCartProducts(updateCart);
        localStorage.setItem("cartItems", JSON.stringify(updateCart));
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
