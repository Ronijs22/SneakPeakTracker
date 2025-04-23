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
      {/* Hero Section */}
      <section className="bg-secondary text-white overflow-hidden relative h-[60vh] sm:h-[70vh] flex items-center">
        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4">Step Into <span className="text-primary">Style</span></h1>
            <p className="text-lg md:text-xl mb-8 text-gray-300">Discover our latest collection of premium sneakers designed for comfort and performance.</p>
            <Link href="/products" className="inline-block bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-opacity-90 transition-all shadow-lg">
              Shop Now
            </Link>
          </div>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/2 lg:w-3/5 opacity-50 md:opacity-70">
          <img 
            src="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80" 
            alt="Sneaker Collection" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>
      
      {/* Featured Products */}
      <section id="featured-products" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold mb-8 text-center">Featured Products</h2>
          
          {/* Filters */}
          <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4 overflow-x-auto pb-2 w-full md:w-auto">
              <Link href="/products" className="px-5 py-2 rounded-full font-medium transition-colors whitespace-nowrap bg-primary text-white">
                All
              </Link>
              <Link href="/products?category=running" className="px-5 py-2 rounded-full font-medium transition-colors whitespace-nowrap bg-white text-gray-700 hover:bg-gray-100">
                Running
              </Link>
              <Link href="/products?category=casual" className="px-5 py-2 rounded-full font-medium transition-colors whitespace-nowrap bg-white text-gray-700 hover:bg-gray-100">
                Casual
              </Link>
              <Link href="/products?category=basketball" className="px-5 py-2 rounded-full font-medium transition-colors whitespace-nowrap bg-white text-gray-700 hover:bg-gray-100">
                Basketball
              </Link>
              <Link href="/products?category=training" className="px-5 py-2 rounded-full font-medium transition-colors whitespace-nowrap bg-white text-gray-700 hover:bg-gray-100">
                Training
              </Link>
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto">
              <select 
                className="border border-gray-300 rounded-full py-2 px-4 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="all">Price: All</option>
                <option value="under100">Under $100</option>
                <option value="100to200">$100 - $200</option>
                <option value="over200">Over $200</option>
              </select>
              
              <select 
                className="border border-gray-300 rounded-full py-2 px-4 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="all">Color: All</option>
                <option value="black">Black</option>
                <option value="white">White</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
              </select>
            </div>
          </div>
          
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts?.map((product: Product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onShowDetails={handleShowProductDetails} 
                />
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link href="/products" className="bg-white border border-gray-300 text-neutral-dark font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors inline-block">
              View All Products
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Collection Banner */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl overflow-hidden shadow-md">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-heading font-bold mb-4">New Season Collection</h2>
                <p className="text-gray-600 mb-6">Discover our latest styles designed for performance and everyday wear. Limited edition colorways available now.</p>
                <Link href="/products?category=new" className="inline-block bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-opacity-90 transition-all shadow-md w-fit">
                  Shop Collection
                </Link>
              </div>
              <div className="h-64 md:h-auto">
                <img 
                  src="https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80" 
                  alt="New Season Collection" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold mb-8 text-center">Shop By Category</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Category 1 */}
            <Link href="/products?category=running" className="group rounded-lg overflow-hidden relative">
              <div className="aspect-square bg-gray-200 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80" 
                  alt="Running" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white font-semibold text-xl md:text-2xl">Running</h3>
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
                  <h3 className="text-white font-semibold text-xl md:text-2xl">Basketball</h3>
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
                  <h3 className="text-white font-semibold text-xl md:text-2xl">Training</h3>
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
                  <h3 className="text-white font-semibold text-xl md:text-2xl">Casual</h3>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

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
