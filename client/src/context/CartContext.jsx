import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("stylehive-cart");
    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      localStorage.removeItem("stylehive-cart");
      return [];
    }
  });

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem("stylehive-cart", JSON.stringify(cart));
  }, [cart]);

  // Add a product or increase its quantity
  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  // Update a product’s quantity (removes if quantity ≤ 0)
  const updateQuantity = (_id, quantity) => {
    setCart((prev) =>
      prev
        .map((item) => (item._id === _id ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove a product completely
  const removeFromCart = (_id) => {
    setCart((prev) => prev.filter((item) => item._id !== _id));
  };

  // Empty the cart
  const clearCart = () => setCart([]);

  // Derived totals
  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );
  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
