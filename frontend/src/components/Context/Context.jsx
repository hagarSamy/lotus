import React, { createContext, useState, useEffect } from "react";

// Correctly naming and exporting the context
const CartContext = createContext({
    cartCount: 0,
    cartItems: [],
  });

  
// Adjusting the export syntax for the provider component
export default function CartContextProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);


  function changeCart() {
    setCartCount(cartCount + 1);
  }


  useEffect(() => {
    const savedCartState = JSON.parse(localStorage.getItem('cartState'));
    if (savedCartState) {
      setCartItems(savedCartState.cartItems);
      setCartCount(savedCartState.cartCount);
    }
  }, []);
  

  const addToCart = (item) => {
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);

    let updatedCartItems;
    if (existingItemIndex >= 0) {
      updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
    } else {
      updatedCartItems = [...cartItems, {...item, quantity: 1}];
    }

    const newCartCount = updatedCartItems.reduce((total, currentItem) => total + currentItem.quantity, 0);
    setCartItems(updatedCartItems);
    setCartCount(newCartCount);

    localStorage.setItem('cartState', JSON.stringify({ cartItems: updatedCartItems, cartCount: newCartCount }));
  };

  const removeFromCart = (itemId) => {
    const itemToRemove = cartItems.find((item) => item.id === itemId);
  
    if (itemToRemove) {
      // Subtract the quantity of the item being removed from the current cartCount
      const newCartCount = cartCount - itemToRemove.quantity;
  
      // Filter out the item from cartItems
      const updatedCartItems = cartItems.filter((item) => item.id!== itemId);
  
      // Update state
      setCartItems(updatedCartItems);
      setCartCount(newCartCount);
  
      // Save the updated state to localStorage
      localStorage.setItem('cartState', JSON.stringify({ cartItems: updatedCartItems, cartCount: newCartCount }));
    }
  };
  
  // Using the context name in the Provider component
  return (
    <CartContext.Provider value={{ cartCount, changeCart, addToCart, cartItems, removeFromCart}}>
      {children}
    </CartContext.Provider>
  );
}

// Exporting the context separately if needed elsewhere
export { CartContext };
