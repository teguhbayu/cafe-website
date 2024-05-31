import { useEffect, useRef, useState } from "react";
import { getCookie, setCookie } from "cookies-next";

export interface cartList {
  productId: string;
  qty: number;
}

export const useCartItems = () => {
  // Load cart from localStorage on hook initialization
  const [cart, setCart] = useState<cartList[]>([]);
  const firstRender = useRef(true);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (firstRender.current) {
      setCart(JSON.parse(getCookie("cart") || "[]"));
      firstRender.current = false;
    } else {
      setCookie("cart", JSON.stringify(cart));
    }
  }, [cart]);

  // Function to add an item to the cart
  const addToCart = (item: cartList) => {
    let itemInCart;
    itemInCart = cart.filter((i) => {
      return i.productId === item.productId;
    })[0];
    if (itemInCart) {
      itemInCart.qty = item.qty;
      item.qty > 0
        ? setCart([
            ...cart.filter((i) => {
              return i.productId !== item.productId && i.qty > 0;
            }),
            itemInCart,
          ])
        : setCart([
            ...cart.filter((i) => {
              return i.productId !== item.productId && i.qty > 0;
            }),
          ]);
    } else
      setCart([
        ...cart.filter((i) => {
          return i.qty > 0;
        }),
        item,
      ]);
  };

  // Function to clear the entire cart
  const clearCart = () => {
    setCart([]);
  };

  // Function to remove a specific item from the cart
  const removeFromCart = (itemId: string) => {
    const updatedCart = cart.filter((item) => item.productId !== itemId);
    setCart(updatedCart);
  };

  // Calculate cart count
  const cartCount = cart.length;

  return {
    cart,
    cartCount,
    addToCart,
    clearCart,
    removeFromCart,
  };
};
