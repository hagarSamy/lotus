import React, { createContext, useState, useEffect } from "react";

// Correctly naming and exporting the context
const CartContext = createContext({
  cartCount: 0,
  cartItems: [],
});

export default function CartContextProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);
  let [cartItems, setCartItems] = useState([]);

  function changeCart() {
    setCartCount(cartCount + 1);
  }

  useEffect(() => {
    const savedCartState = JSON.parse(localStorage.getItem("cartState"));
    if (savedCartState) {
      setCartItems(savedCartState.cartItems);
      setCartCount(savedCartState.cartCount);
    }
  }, []);

  const addToCart = (item) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    let updatedCartItems;
    if (existingItemIndex >= 0) {
      updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
    } else {
      updatedCartItems = [...cartItems, { ...item, quantity: 1 }];
    }

    const newCartCount = updatedCartItems.reduce(
      (total, currentItem) => total + currentItem.quantity,
      0
    );
    setCartItems(updatedCartItems);
    setCartCount(newCartCount);

    localStorage.setItem(
      "cartState",
      JSON.stringify({ cartItems: updatedCartItems, cartCount: newCartCount })
    );
  };

  const removeFromCart = (itemId) => {
    const itemToRemove = cartItems.find((item) => item.id === itemId);

    if (itemToRemove) {
      const newCartCount = cartCount - itemToRemove.quantity;

      const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
      console.log(updatedCartItems)

      setCartItems(updatedCartItems);
      setCartCount(newCartCount);
      localStorage.setItem(
        "cartState",
        JSON.stringify({ cartItems: updatedCartItems, cartCount: newCartCount })
      );
      window.location.reload();
    }
  };
  
  return (
    <CartContext.Provider
      value={{ cartCount, changeCart, addToCart, cartItems, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartContext };
