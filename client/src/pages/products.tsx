import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useSearch } from 'wouter';
import ProductCard from '@/components/ui/product-card';
import ProductDetailModal from '@/components/ui/product-detail-modal';
import { Product } from '@shared/schema';
import { getPriceRange } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Products() {
  const [, params] = useSearch();
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  
  // Parse URL parameters
  const category = params.category || 'all';
  const color = params.color || 'all';
  const priceRange = params.price || 'all';
  const query = params.q || '';
  
  // State for filters
  const [activeCategory, setActiveCategory] = useState(category);
  const [activeColor, setActiveColor] = useState(color);
  const [activePriceRange, setActivePriceRange] = useState(priceRange);
  const [searchQuery, setSearchQuery] = useState(query);
  
  const { data: products, isLoading } = useQuery({
    queryKey: ['/api/products'],
  });

  // Filter products based on active filters
  const filteredProducts = products ? products.filter((product: Product) => {
    // Category filter
    if (activeCategory !== 'all' && product.category !== activeCategory) {
      return false;
    }
    
    // Color filter
    if (activeColor !== 'all' && product.color !== activeColor) {
      return false;
    }
    
    // Price range filter
    if (activePriceRange !== 'all') {
      const { min, max } = getPriceRange(activePriceRange);
      if (product.price < min) return false;
      if (max > 0 && product.price > max) return false;
    }
    
    // Search query
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !product.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  }) : [];

  const handleShowProductDetails = (product: Product) => {
    setActiveProduct(product);
    setShowProductDetail(true);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-heading font-bold mb-8">All Products</h1>
        
        {/* Filters */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <h3 className="font-medium text-gray-700">Category</h3>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setActiveCategory('all')} 
                className={`px-3 py-1 rounded-full text-sm transition-colors 
                  ${activeCategory === 'all' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                All
              </button>
              <button 
                onClick={() => setActiveCategory('running')} 
                className={`px-3 py-1 rounded-full text-sm transition-colors 
                  ${activeCategory === 'running' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                Running
              </button>
              <button 
                onClick={() => setActiveCategory('casual')} 
                className={`px-3 py-1 rounded-full text-sm transition-colors 
                  ${activeCategory === 'casual' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                Casual
              </button>
              <button 
                onClick={() => setActiveCategory('basketball')} 
                className={`px-3 py-1 rounded-full text-sm transition-colors 
                  ${activeCategory === 'basketball' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                Basketball
              </button>
              <button 
                onClick={() => setActiveCategory('training')} 
                className={`px-3 py-1 rounded-full text-sm transition-colors 
                  ${activeCategory === 'training' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                Training
              </button>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium text-gray-700">Color</h3>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setActiveColor('all')} 
                className={`px-3 py-1 rounded-full text-sm transition-colors 
                  ${activeColor === 'all' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                All
              </button>
              <button 
                onClick={() => setActiveColor('black')} 
                className={`px-3 py-1 rounded-full text-sm transition-colors flex items-center 
                  ${activeColor === 'black' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                <span className="w-3 h-3 rounded-full bg-black mr-1"></span> Black
              </button>
              <button 
                onClick={() => setActiveColor('white')} 
                className={`px-3 py-1 rounded-full text-sm transition-colors flex items-center 
                  ${activeColor === 'white' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                <span className="w-3 h-3 rounded-full bg-white border border-gray-300 mr-1"></span> White
              </button>
              <button 
                onClick={() => setActiveColor('red')} 
                className={`px-3 py-1 rounded-full text-sm transition-colors flex items-center 
                  ${activeColor === 'red' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                <span className="w-3 h-3 rounded-full bg-red-500 mr-1"></span> Red
              </button>
              <button 
                onClick={() => setActiveColor('blue')} 
                className={`px-3 py-1 rounded-full text-sm transition-colors flex items-center 
                  ${activeColor === 'blue' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                <span className="w-3 h-3 rounded-full bg-blue-500 mr-1"></span> Blue
              </button>
              <button 
                onClick={() => setActiveColor('green')} 
                className={`px-3 py-1 rounded-full text-sm transition-colors flex items-center 
                  ${activeColor === 'green' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                <span className="w-3 h-3 rounded-full bg-green-500 mr-1"></span> Green
              </button>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium text-gray-700">Price</h3>
            <Select 
              value={activePriceRange}
              onValueChange={(value) => setActivePriceRange(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select price range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under100">Under $100</SelectItem>
                <SelectItem value="100to200">$100 - $200</SelectItem>
                <SelectItem value="over200">Over $200</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium text-gray-700">Sort By</h3>
            <Select defaultValue="relevance">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="bestselling">Best Selling</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Products */}
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
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product: Product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onShowDetails={handleShowProductDetails} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium mb-2">No products found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your filters or search query.</p>
            <button 
              onClick={() => {
                setActiveCategory('all');
                setActiveColor('all');
                setActivePriceRange('all');
                setSearchQuery('');
              }}
              className="inline-block bg-primary text-white font-semibold px-6 py-2 rounded-full hover:bg-opacity-90 transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {filteredProducts.length > 0 && (
          <div className="flex justify-center mt-12">
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                Previous
              </button>
              <button className="px-4 py-2 bg-primary text-white border border-primary rounded-md">
                1
              </button>
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                2
              </button>
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                3
              </button>
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        )}
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
