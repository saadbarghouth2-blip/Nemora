import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product, CartItem } from '../types';

interface CartItemExtended extends CartItem { cartItemId: string; }

interface CartContextType {
  cartItems: CartItemExtended[];
  addToCart: (p: Product, s: string, c: string) => void;
  updateQuantity: (id: string, q: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getCartCount: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItemExtended[]>(() => {
    try {
      const saved = localStorage.getItem('nemora_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });

  useEffect(() => {
    localStorage.setItem('nemora_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, size: string, color: string) => {
    setCartItems(prev => {
      const existing = prev.find(i => 
        i.id === product.id && i.selectedSize === size && i.selectedColor === color
      );

      if (existing) {
        return prev.map(i => i.cartItemId === existing.cartItemId 
          ? { ...i, quantity: i.quantity + 1 } : i
        );
      }

      const newItem: CartItemExtended = {
        ...product,
        selectedSize: size,
        selectedColor: color,
        quantity: 1,
        cartItemId: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      };
      return [...prev, newItem];
    });
  };

  const updateQuantity = (id: string, q: number) => {
    setCartItems(prev => prev.map(i => i.cartItemId === id ? { ...i, quantity: Math.max(0, q) } : i).filter(i => i.quantity > 0));
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(i => i.cartItemId !== id));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('nemora_cart');
  };

  const getCartCount = () => cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const getTotalPrice = () => cartItems.reduce((acc, i) => acc + (i.price * i.quantity), 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart, getCartCount, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart error');
  return context;
};