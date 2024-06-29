import { createContext, useContext, useState } from "react";

const ShoppingCartContext = createContext({});

const ShoppingCartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Determine quantity of item
  const getItemQuantity = (id) => {
    console.log('get', id);
    const item = cartItems.find((item) => item.id === id);
    console.log(item);
    return item?.quantity || 0;
  };

  // Add items to cart
  const increaseQuantity = (id) => {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === id) === null) {
        return [...currentItems, { id, quantity: 1 }];
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return {...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  // Decrease cart items
  const decreaseQuantity = (id) => {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === id) === null) {
        return currentItems.filter((item) => item.id!== id);
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return {...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems((currentItems) => currentItems.filter((item) => item.id!== id));
  };

  return (
    <ShoppingCartContext.Provider value={{ cartItems, removeItem, decreaseQuantity, increaseQuantity, getItemQuantity }}>
      {children}
    </ShoppingCartContext.Provider>
  );
}

export default ShoppingCartProvider; // Corrected export name

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};
