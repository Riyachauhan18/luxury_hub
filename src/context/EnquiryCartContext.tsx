'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { EnquiryItem } from '../lib/types';

interface EnquiryCartContextType {
  cartItems: EnquiryItem[];
  addToCart: (item: EnquiryItem) => void;
  removeFromCart: (productId: string, variantFinish: string | null) => void;
  updateQuantity: (productId: string, variantFinish: string | null, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
}

const EnquiryCartContext = createContext<EnquiryCartContextType | undefined>(undefined);

export function EnquiryCartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<EnquiryItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('tlh_enquiry_cart');
      if (stored) {
        setCartItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load enquiry cart from localStorage:', e);
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('tlh_enquiry_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save enquiry cart to localStorage:', e);
    }
  }, [cartItems, isLoaded]);

  const addToCart = (item: EnquiryItem) => {
    setCartItems(prev => {
      // Find if item already exists with the same ID and variant finish
      const existingIdx = prev.findIndex(
        i => i.product_id === item.product_id && i.variant_finish === item.variant_finish
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += item.quantity;
        return updated;
      }

      return [...prev, item];
    });
  };

  const removeFromCart = (productId: string, variantFinish: string | null) => {
    setCartItems(prev => prev.filter(
      i => !(i.product_id === productId && i.variant_finish === variantFinish)
    ));
  };

  const updateQuantity = (productId: string, variantFinish: string | null, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantFinish);
      return;
    }
    setCartItems(prev => prev.map(i => {
      if (i.product_id === productId && i.variant_finish === variantFinish) {
        return { ...i, quantity };
      }
      return i;
    }));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <EnquiryCartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount
    }}>
      {children}
    </EnquiryCartContext.Provider>
  );
}

export function useEnquiryCart() {
  const context = useContext(EnquiryCartContext);
  if (!context) {
    throw new Error('useEnquiryCart must be used within an EnquiryCartProvider');
  }
  return context;
}
