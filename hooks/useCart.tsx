"use client";

import { CartProduct } from "@prisma/client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type CartContextProps = {
  cartTotalQty: number;
  cartProducts: CartProduct[] | null;
  cartTotalAmount: number;
  handleAddProduct: (product: CartProduct) => void;
  handleRemoveProduct: (product: CartProduct) => void;
  handleIncreaseCart: (product: CartProduct) => void;
  handleDecreaseCart: (product: CartProduct) => void;
  handleClearCart: () => void;
  paymentIntent: string | null;
  handleSetPaymentIntent: (value: string | null) => void;
};

type Props = {
  [propName: string]: any;
};

export const CartContext = createContext<CartContextProps | null>(null);

export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState<number>(0);
  const [cartTotalAmount, setCartTotalAmount] = useState<number>(0);
  const [cartProducts, setCartProducts] = useState<CartProduct[] | null>(null);
  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

  useEffect(() => {
    const cartItems: any = localStorage.getItem("eShopCartItems");
    const cProducts: CartProduct[] | null = JSON.parse(cartItems);
    const eShopPaymentIntent: any = localStorage.getItem("eShopPaymentIntent");
    const paymentIntent: string | null = JSON.parse(eShopPaymentIntent);

    setCartProducts(cProducts);
    setPaymentIntent(paymentIntent);
  }, []);

  useEffect(() => {
    const getTotals = () => {
      if (cartProducts) {
        const { total, quality } = cartProducts.reduce(
          (acc, item) => {
            const itemTotal = item.price * item.quantity;
            acc.total += itemTotal;
            acc.quality += item.quantity;
            return acc;
          },
          { total: 0, quality: 0 }
        );
        setCartTotalQty(quality);
        setCartTotalAmount(total);
      }
    };
    getTotals();
  }, [cartProducts]);

  const handleAddProduct = useCallback((product: CartProduct) => {
    setCartProducts((prev) => {
      let updatedCart;
      if (prev) {
        updatedCart = [...prev, product];
      } else {
        updatedCart = [product];
      }
      localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));

      return updatedCart;
    });
  }, []);

  const handleRemoveProduct = useCallback(
    (product: CartProduct) => {
      if (cartProducts) {
        const filterProducts = cartProducts.filter(
          (item) => item.id !== product.id
        );
        setCartProducts(filterProducts);
        localStorage.setItem("eShopCartItems", JSON.stringify(filterProducts));
      }
    },
    [cartProducts]
  );

  const handleIncreaseCart = useCallback(
    (product: CartProduct) => {
      let updatedCart;
      if (product.quantity === 99) return;
      if (cartProducts) {
        updatedCart = [...cartProducts];
        const indexItem = cartProducts.findIndex(
          (item) => item.id === product.id
        );

        if (indexItem > -1) {
          updatedCart[indexItem].quantity = ++updatedCart[indexItem].quantity;
        }
        setCartProducts(updatedCart);
        localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );
  const handleDecreaseCart = useCallback(
    (product: CartProduct) => {
      let updatedCart;
      if (product.quantity === 1) return;
      if (cartProducts) {
        updatedCart = [...cartProducts];
        const indexItem = cartProducts.findIndex(
          (item) => item.id === product.id
        );

        if (indexItem > -1) {
          updatedCart[indexItem].quantity = --updatedCart[indexItem].quantity;
        }
        setCartProducts(updatedCart);
        localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  const handleClearCart = useCallback(() => {
    setCartProducts([]);
    setCartTotalQty(0);
    localStorage.setItem("eShopCartItems", JSON.stringify(null));
  }, []);

  const handleSetPaymentIntent = useCallback(
    (value: string | null) => {
      setPaymentIntent(value);
      localStorage.setItem("eShopPaymentIntent", JSON.stringify(value));
    },
    [paymentIntent]
  );

  const value = {
    cartTotalQty,
    cartProducts,
    cartTotalAmount,
    paymentIntent,
    handleAddProduct,
    handleRemoveProduct,
    handleIncreaseCart,
    handleDecreaseCart,
    handleClearCart,
    handleSetPaymentIntent,
  };
  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === null)
    throw new Error("useCart must be used within a CartContextProvider");
  return context;
};
