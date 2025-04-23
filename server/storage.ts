import { 
  type Product, 
  type InsertProduct, 
  type CartItem, 
  type InsertCartItem 
} from "@shared/schema";

// Define the interface for storage operations
export interface IStorage {
  // Product operations
  getAllProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getProductsByColor(color: string): Promise<Product[]>;
  getProductsByPriceRange(min: number, max: number): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  getNewArrivals(): Promise<Product[]>;
  getSaleProducts(): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  
  // Cart operations
  getCartItems(cartId: string): Promise<CartItem[]>;
  getCartItemWithProduct(id: number): Promise<{cartItem: CartItem, product: Product} | undefined>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItemQuantity(id: number, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: number): Promise<boolean>;
  clearCart(cartId: string): Promise<boolean>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private cartItems: Map<number, CartItem>;
  private currentProductId: number;
  private currentCartItemId: number;

  constructor() {
    this.products = new Map();
    this.cartItems = new Map();
    this.currentProductId = 1;
    this.currentCartItemId = 1;
    
    // Initialize with sample products
    this.initializeProducts();
  }

  private initializeProducts() {
    const products: InsertProduct[] = [
      {
        name: "Air Zoom Pegasus",
        price: 129.99,
        description: "The Nike Air Zoom Pegasus is designed with responsive cushioning and a sleek, supportive fit for everyday training runs.",
        category: "running",
        color: "black",
        images: [
          "https://images.unsplash.com/photo-1576672843344-f01907a9d40c?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
          "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
          "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80"
        ],
        sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "11", "12"],
        availableColors: ["black", "white", "blue"],
        isNew: true,
        isFeatured: true
      },
      {
        name: "Classic Street",
        price: 89.99,
        description: "A timeless silhouette with modern comfort features. These versatile sneakers pair easily with any outfit.",
        category: "casual",
        color: "white",
        images: [
          "https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
          "https://images.unsplash.com/photo-1603036050141-c61fde866f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
          "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80"
        ],
        sizes: ["6", "7", "7.5", "8", "8.5", "9", "9.5", "10", "11"],
        availableColors: ["white", "black", "green"],
        isFeatured: true
      },
      {
        name: "Court Vision",
        price: 139.99,
        description: "Dominate the court with these basketball sneakers featuring responsive cushioning and superior ankle support.",
        category: "basketball",
        color: "red",
        images: [
          "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
          "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
          "https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80"
        ],
        sizes: ["8", "8.5", "9", "9.5", "10", "10.5", "11", "12", "13"],
        availableColors: ["red", "black", "blue"],
        isFeatured: true
      },
      {
        name: "Ultra Boost",
        price: 179.99,
        description: "Experience unparalleled energy return and cushioning. These running shoes are designed for maximum comfort on long distance runs.",
        category: "running",
        color: "blue",
        images: [
          "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
          "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
          "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80"
        ],
        sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "12"],
        availableColors: ["blue", "black", "green", "red"],
        isFeatured: true
      },
      {
        name: "Retro Classic",
        price: 109.99,
        description: "Vintage-inspired with modern technology. These retro sneakers bring nostalgic style with all-day comfort.",
        category: "casual",
        color: "green",
        images: [
          "https://images.unsplash.com/photo-1603036050141-c61fde866f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
          "https://images.unsplash.com/photo-1499013819532-e4ff41b00669?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
          "https://images.unsplash.com/photo-1584735175315-9d5df23be620?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80"
        ],
        sizes: ["6", "7", "8", "9", "10", "11", "12"],
        availableColors: ["green", "white", "black"],
        isFeatured: true
      },
      {
        name: "Training Pro",
        price: 149.99,
        description: "Versatile training shoes with stability features for weightlifting and flexibility for cardio workouts.",
        category: "training",
        color: "black",
        images: [
          "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
          "https://images.unsplash.com/photo-1605408499391-6368c628ef42?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
          "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80"
        ],
        sizes: ["7", "8", "9", "10", "11", "12", "13"],
        availableColors: ["black", "white", "blue"],
        isSale: true,
        originalPrice: 189.99,
        isFeatured: true
      },
      {
        name: "Street Force",
        price: 119.99,
        description: "Urban-inspired design with premium materials. These sneakers were made for city streets and everyday style.",
        category: "casual",
        color: "red",
        images: [
          "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
          "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
          "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80"
        ],
        sizes: ["7", "8", "9", "10", "11"],
        availableColors: ["red", "black", "blue"],
        isFeatured: true
      },
      {
        name: "Air Max",
        price: 159.99,
        description: "Featuring visible cushioning technology for impact protection. These running shoes provide all-day comfort and style.",
        category: "running",
        color: "blue",
        images: [
          "https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
          "https://images.unsplash.com/photo-1576672843344-f01907a9d40c?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
          "https://images.unsplash.com/photo-1605408499391-6368c628ef42?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80"
        ],
        sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "11"],
        availableColors: ["blue", "black", "red", "green"],
        isFeatured: true
      }
    ];

    products.forEach(product => {
      const id = this.currentProductId++;
      this.products.set(id, { ...product, id });
    });
  }

  // Product operations
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => category === 'all' || product.category === category
    );
  }

  async getProductsByColor(color: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => color === 'all' || product.color === color
    );
  }

  async getProductsByPriceRange(min: number, max: number): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.price >= min && (max === 0 || product.price <= max)
    );
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.isFeatured
    );
  }

  async getNewArrivals(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.isNew
    );
  }

  async getSaleProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.isSale
    );
  }

  async searchProducts(query: string): Promise<Product[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.products.values()).filter(
      product => 
        product.name.toLowerCase().includes(lowerQuery) || 
        product.description.toLowerCase().includes(lowerQuery) ||
        product.category.toLowerCase().includes(lowerQuery)
    );
  }

  // Cart operations
  async getCartItems(cartId: string): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(
      item => item.cartId === cartId
    );
  }

  async getCartItemWithProduct(id: number): Promise<{cartItem: CartItem, product: Product} | undefined> {
    const cartItem = this.cartItems.get(id);
    if (!cartItem) return undefined;
    
    const product = this.products.get(cartItem.productId);
    if (!product) return undefined;
    
    return { cartItem, product };
  }

  async addToCart(item: InsertCartItem): Promise<CartItem> {
    // Check if product with same ID and size already exists in cart
    const existingItem = Array.from(this.cartItems.values()).find(
      cartItem => cartItem.productId === item.productId && 
                 cartItem.size === item.size &&
                 cartItem.cartId === item.cartId
    );

    if (existingItem) {
      // Update quantity if it exists
      existingItem.quantity += item.quantity;
      this.cartItems.set(existingItem.id, existingItem);
      return existingItem;
    } else {
      // Add new item if it doesn't exist
      const id = this.currentCartItemId++;
      const newItem: CartItem = { ...item, id };
      this.cartItems.set(id, newItem);
      return newItem;
    }
  }

  async updateCartItemQuantity(id: number, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (!item) return undefined;

    if (quantity <= 0) {
      this.cartItems.delete(id);
      return undefined;
    }

    item.quantity = quantity;
    this.cartItems.set(id, item);
    return item;
  }

  async removeFromCart(id: number): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  async clearCart(cartId: string): Promise<boolean> {
    const itemsToDelete = Array.from(this.cartItems.values())
      .filter(item => item.cartId === cartId)
      .map(item => item.id);
    
    itemsToDelete.forEach(id => this.cartItems.delete(id));
    return true;
  }
}

export const storage = new MemStorage();
