import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

export function getPriceRange(priceRange: string): { min: number, max: number } {
  switch (priceRange) {
    case 'under100':
      return { min: 0, max: 100 };
    case '100to200':
      return { min: 100, max: 200 };
    case 'over200':
      return { min: 200, max: 0 }; // 0 max means no upper limit
    default:
      return { min: 0, max: 0 }; // All prices
  }
}

export function generateCartId(): string {
  // Check if we have a cart ID stored
  let cartId = localStorage.getItem('sneakpeak_cart_id');
  
  // If not, generate a new one
  if (!cartId) {
    cartId = 'cart_' + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('sneakpeak_cart_id', cartId);
  }
  
  return cartId;
}
