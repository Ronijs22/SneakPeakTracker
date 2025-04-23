import { useState } from 'react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '@/components/ui/product-card';
import ProductDetailModal from '@/components/ui/product-detail-modal';
import { Product } from '@shared/schema';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  
  const { data: featuredProducts, isLoading } = useQuery({
    queryKey: ['/api/products/featured'],
  });

  const handleShowProductDetails = (product: Product) => {
    setActiveProduct(product);
    setShowProductDetail(true);
  };

  return (
    <>
      {/* Main Carousel */}
      <section className="relative overflow-hidden">
        <div className="relative w-full h-[500px]">
          <div className="absolute inset-0 bg-black/20"></div>
          <img 
            src="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80" 
            alt="Sneaker Collection" 
            className="w-full h-full object-cover"
          />
          {/* Large SNEAKPEAK logo watermark */}
          <div className="absolute right-[50px] top-[50px] w-[428px] h-[428px] opacity-60">
            <img 
              src="/logo-placeholder.png" 
              alt="SNEAKPEAK Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center text-white z-10">
            <div className="flex space-x-2 mt-4">
              <span className="w-3 h-3 bg-[#B98615] rounded-full"></span>
              <span className="w-3 h-3 bg-white rounded-full opacity-70"></span>
              <span className="w-3 h-3 bg-white rounded-full opacity-70"></span>
              <span className="w-3 h-3 bg-white rounded-full opacity-70"></span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-6xl font-heading mb-8 text-center">POPULĀRIE PRODUKTI</h2>
          
          {/* Products Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="aspect-square bg-gray-200 animate-pulse"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {Array.isArray(featuredProducts) && featuredProducts.map((product: Product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onShowDetails={handleShowProductDetails} 
                />
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link href="/products" className="bg-[#B98615] text-white font-heading text-2xl px-8 py-2 rounded-full hover:bg-opacity-90 transition-all inline-block">
              PARĀDĪT VAIRĀK PRODUKTU
            </Link>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-6xl font-heading mb-8 text-center">POPULĀRAS KATEGORIJAS</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Category 1 */}
            <Link href="/products?category=running" className="group rounded-lg overflow-hidden relative">
              <div className="aspect-square bg-gray-200 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80" 
                  alt="Running" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white font-heading text-4xl">SKRIEŠANAS</h3>
                </div>
              </div>
            </Link>
            
            {/* Category 2 */}
            <Link href="/products?category=basketball" className="group rounded-lg overflow-hidden relative">
              <div className="aspect-square bg-gray-200 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1579338559194-a162d19bf842?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80" 
                  alt="Basketball" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white font-heading text-4xl">BASKETBOLA</h3>
                </div>
              </div>
            </Link>
            
            {/* Category 3 */}
            <Link href="/products?category=training" className="group rounded-lg overflow-hidden relative">
              <div className="aspect-square bg-gray-200 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1520316587275-5e4f06f355e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80" 
                  alt="Training" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white font-heading text-4xl">TRENIŅU</h3>
                </div>
              </div>
            </Link>
            
            {/* Category 4 */}
            <Link href="/products?category=casual" className="group rounded-lg overflow-hidden relative">
              <div className="aspect-square bg-gray-200 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80" 
                  alt="Casual" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white font-heading text-4xl">IKDIENAS</h3>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Brands Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-6xl font-heading mb-8 text-center">POPULĀRI ZĪMOLI</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="aspect-square bg-white shadow-md rounded-lg flex items-center justify-center p-6">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/1200px-Logo_NIKE.svg.png" 
                alt="Nike" 
                className="max-h-16 object-contain"
              />
            </div>
            <div className="aspect-square bg-white shadow-md rounded-lg flex items-center justify-center p-6">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/1200px-Adidas_Logo.svg.png" 
                alt="Adidas" 
                className="max-h-16 object-contain"
              />
            </div>
            <div className="aspect-square bg-white shadow-md rounded-lg flex items-center justify-center p-6">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Puma_logo.svg/2560px-Puma_logo.svg.png" 
                alt="Puma" 
                className="max-h-16 object-contain"
              />
            </div>
            <div className="aspect-square bg-white shadow-md rounded-lg flex items-center justify-center p-6">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/New_Balance_logo.svg/2560px-New_Balance_logo.svg.png" 
                alt="New Balance" 
                className="max-h-16 object-contain"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-[#B98615] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#B98615]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h3 className="font-heading text-3xl mb-2">BEZMAKSAS PIEGĀDE</h3>
              <p className="font-body text-gray-600">Visā pasaulē pirkumiem virs 100€</p>
            </div>
            
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-[#B98615] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#B98615]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="font-heading text-3xl mb-2">DROŠI MAKSĀJUMI</h3>
              <p className="font-body text-gray-600">100% droši maksājumi</p>
            </div>
            
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-[#B98615] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#B98615]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="font-heading text-3xl mb-2">ĀTRA ATGRIEŠANA</h3>
              <p className="font-body text-gray-600">30 dienu garantēta atmaksa</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer Copyright */}
      <div className="py-4 text-center">
        <p className="font-heading text-2xl">© 2025 SNEAKPEAK, Inc. All Rights Reserved</p>
      </div>

      {/* Product Detail Modal */}
      {showProductDetail && activeProduct && (
        <ProductDetailModal 
          product={activeProduct} 
          onClose={() => setShowProductDetail(false)} 
        />
      )}
    </>
  );
}
