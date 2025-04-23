import React, { createContext, useState, useEffect } from 'react';
import { apiRequest } from '@/lib/queryClient';
import { generateCartId } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@shared/schema';

type CartItem = {
  id: number;
  product: Product;
  quantity: number;
  size: string;
};

type CartContextType = {
  cartItems: CartItem[];
  isCartOpen: boolean;
  isLoading: boolean;
  addToCart: (product: Product, quantity: number, size: string) => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
  updateCartItemQuantity: (id: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  openCart: () => void;
  closeCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const cartId = generateCartId();

  // Fetch cart items on mount
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/cart/${cartId}`);
        if (res.ok) {
          const data = await res.json();
          setCartItems(data);
        }
      } catch (error) {
        console.error('Failed to fetch cart items:', error);
        toast({
          title: "Error",
          description: "Failed to load your cart. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartItems();
  }, [toast]);

  const addToCart = async (product: Product, quantity: number, size: string) => {
    try {
      setIsLoading(true);
      const res = await apiRequest('POST', '/api/cart', {
        productId: product.id,
        quantity,
        size,
        cartId
      });
      
      if (res.ok) {
        const newItem = await res.json();
        
        // Check if item already exists in cart
        const existingItemIndex = cartItems.findIndex(
          item => item.id === newItem.id
        );
        
        if (existingItemIndex >= 0) {
          // Update existing item
          const newCartItems = [...cartItems];
          newCartItems[existingItemIndex] = newItem;
          setCartItems(newCartItems);
        } else {
          // Add new item
          setCartItems(prev => [...prev, newItem]);
        }
        
        setIsCartOpen(true);
        toast({
          title: "Added to cart",
          description: `${quantity} x ${product.name} (Size: ${size})`,
        });
      }
    } catch (error) {
      console.error('Failed to add to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (id: number) => {
    try {
      setIsLoading(true);
      const res = await apiRequest('DELETE', `/api/cart/${id}`, undefined);
      
      if (res.ok) {
        setCartItems(prev => prev.filter(item => item.id !== id));
        toast({
          title: "Removed from cart",
          description: "Item has been removed from your cart.",
        });
      }
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      toast({
        title: "Error",
        description: "Failed to remove item from cart. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateCartItemQuantity = async (id: number, quantity: number) => {
    try {
      setIsLoading(true);
      
      if (quantity <= 0) {
        await removeFromCart(id);
        return;
      }
      
      const res = await apiRequest('PUT', `/api/cart/${id}`, { quantity });
      
      if (res.ok) {
        const updatedItem = await res.json();
        setCartItems(prev => 
          prev.map(item => item.id === id ? updatedItem : item)
        );
      }
    } catch (error) {
      console.error('Failed to update cart item quantity:', error);
      toast({
        title: "Error",
        description: "Failed to update item quantity. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setIsLoading(true);
      const res = await apiRequest('DELETE', `/api/cart/clear/${cartId}`, undefined);
      
      if (res.ok) {
        setCartItems([]);
        toast({
          title: "Cart cleared",
          description: "All items have been removed from your cart.",
        });
      }
    } catch (error) {
      console.error('Failed to clear cart:', error);
      toast({
        title: "Error",
        description: "Failed to clear your cart. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        isLoading,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        openCart,
        closeCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
