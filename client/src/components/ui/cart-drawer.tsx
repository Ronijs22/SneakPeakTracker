import { useCart } from '@/hooks/use-cart';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export default function CartDrawer() {
  const { 
    cartItems, 
    removeFromCart, 
    updateCartItemQuantity, 
    closeCart, 
    getCartTotal,
    getCartCount,
    isLoading
  } = useCart();

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={closeCart}
      ></div>
      
      <div 
        className="fixed top-0 right-0 bottom-0 w-full sm:max-w-md bg-white shadow-lg overflow-y-auto animate-slideInRight"
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-200">
          <h2 className="text-xl font-semibold">
            Your Cart {getCartCount() > 0 ? `(${getCartCount()})` : ''}
          </h2>
          <button onClick={closeCart} className="text-neutral-dark hover:text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-4">
          {/* Empty Cart State */}
          {cartItems.length === 0 && (
            <div className="py-12 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="text-gray-500 mb-6">Your cart is empty</p>
              <Button 
                onClick={closeCart} 
                className="bg-primary text-white font-semibold px-6 py-2 rounded-full hover:bg-opacity-90 transition-all"
              >
                Continue Shopping
              </Button>
            </div>
          )}
          
          {/* Cart Items */}
          {cartItems.length > 0 && (
            <div>
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={item.id} className="py-4 flex">
                    <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-grow">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-neutral-dark">{item.product.name}</h3>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          disabled={isLoading}
                          className="text-gray-400 hover:text-primary transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                      <p className="text-gray-500 text-sm mb-2">Size: {item.size}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center border border-gray-300 rounded-full">
                          <button 
                            onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                            disabled={isLoading}
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                            disabled={isLoading}
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                        <p className="font-semibold">{formatPrice(item.product.price * item.quantity)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Cart Summary */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">{formatPrice(getCartTotal())}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">Free</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Taxes</span>
                  <span className="font-semibold">Calculated at checkout</span>
                </div>
                <div className="flex justify-between mb-6 pb-4 border-b border-gray-200">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-lg font-bold">{formatPrice(getCartTotal())}</span>
                </div>
                
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block bg-primary text-white text-center font-semibold px-6 py-3 rounded-full hover:bg-opacity-90 transition-all mb-3"
                >
                  Checkout
                </Link>
                <button 
                  onClick={closeCart} 
                  className="block w-full text-center text-gray-600 hover:text-primary transition-colors text-sm"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
