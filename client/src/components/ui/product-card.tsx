import { Link } from 'wouter';
import { Product } from '@shared/schema';
import { useCart } from '@/hooks/use-cart';
import { formatPrice } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
  onShowDetails?: (product: Product) => void;
}

export default function ProductCard({ product, onShowDetails }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Add with default size
    addToCart(product, 1, product.sizes[0]);
  };

  return (
    <div className="product-card bg-white rounded-lg shadow-sm overflow-hidden relative group">
      <div className="aspect-square overflow-hidden relative">
        <Link href={`/product/${product.id}`}>
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover"
            onClick={onShowDetails ? () => onShowDetails(product) : undefined}
          />
        </Link>
        {product.isNew && (
          <div className="absolute top-3 left-3 bg-primary text-white text-xs font-semibold px-2 py-1 rounded">New</div>
        )}
        {product.isSale && (
          <div className="absolute top-3 left-3 bg-secondary text-white text-xs font-semibold px-2 py-1 rounded">Sale</div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-neutral-dark">{product.name}</h3>
        <div className="flex justify-between items-center mt-1">
          <div>
            <p className="font-semibold">{formatPrice(product.price)}</p>
            {product.originalPrice && (
              <p className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</p>
            )}
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm ml-1">{product.rating ? product.rating.toFixed(1) : '0.0'}</span>
          </div>
        </div>
      </div>
      <div className="quick-add absolute bottom-0 left-0 right-0 bg-primary text-white font-semibold text-center py-3 translate-y-full transition-transform duration-200">
        <button 
          onClick={handleQuickAdd}
          className="w-full h-full"
        >
          Quick Add
        </button>
      </div>
    </div>
  );
}
