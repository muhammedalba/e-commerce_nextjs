'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';

interface CartItem {
  id: number;
  image: string;
  title: string;
  price: number;
  quantity: number;
  active: boolean; // true = cart, false = wishlist
}

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  addToWishlist: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  removeFromWishlist: (id: number) => void;
  updateItemQuantity: (id: number, quantity: number) => void;
  isCartLoaded: boolean;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartLoaded, setIsCartLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
        localStorage.removeItem('cart');
      }
    }
    setIsCartLoaded(true);
  }, []);

  // Save to localStorage with debounce
  useEffect(() => {
    if (!isCartLoaded) return;
    const timeout = setTimeout(() => {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }, 300); // delay write for performance

    return () => clearTimeout(timeout);
  }, [cartItems, isCartLoaded]);

  // Add item to cart
  const addToCart = useCallback((item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id && i.active === true);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.active === true
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        return [...prev, { ...item, active: true }];
      }
    });
  }, []);

  // Add item to wishlist
  const addToWishlist = useCallback((item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id && i.active === false);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.active === false
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        return [...prev, { ...item, active: false }];
      }
    });
  }, []);

  // Remove from cart only (active: true)
  const removeFromCart = useCallback((id: number) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === id && item.active === true))
    );
  }, []);

  // Remove from wishlist only (active: false)
  const removeFromWishlist = useCallback((id: number) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === id && item.active === false))
    );
  }, []);

  // Update quantity
  const updateItemQuantity = useCallback((id: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        addToWishlist,
        removeFromCart,
        removeFromWishlist,
        updateItemQuantity,
        isCartLoaded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
