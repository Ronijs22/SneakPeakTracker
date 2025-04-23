import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertCartItemSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Products routes
  app.get('/api/products', async (req, res) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch products' });
    }
  });

  app.get('/api/products/featured', async (req, res) => {
    try {
      const products = await storage.getFeaturedProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch featured products' });
    }
  });

  app.get('/api/products/new', async (req, res) => {
    try {
      const products = await storage.getNewArrivals();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch new arrivals' });
    }
  });

  app.get('/api/products/sale', async (req, res) => {
    try {
      const products = await storage.getSaleProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch sale products' });
    }
  });

  app.get('/api/products/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid product ID' });
      }

      const product = await storage.getProductById(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.json(product);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch product' });
    }
  });

  app.get('/api/products/category/:category', async (req, res) => {
    try {
      const category = req.params.category;
      const products = await storage.getProductsByCategory(category);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch products by category' });
    }
  });

  app.get('/api/products/color/:color', async (req, res) => {
    try {
      const color = req.params.color;
      const products = await storage.getProductsByColor(color);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch products by color' });
    }
  });

  app.get('/api/products/price/:min/:max', async (req, res) => {
    try {
      const min = parseFloat(req.params.min);
      const max = parseFloat(req.params.max);
      
      if (isNaN(min) || isNaN(max)) {
        return res.status(400).json({ message: 'Invalid price range' });
      }

      const products = await storage.getProductsByPriceRange(min, max);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch products by price range' });
    }
  });

  app.get('/api/search', async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ message: 'Search query is required' });
      }

      const products = await storage.searchProducts(query);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Failed to search products' });
    }
  });

  app.get('/api/cart/:cartId', async (req, res) => {
    try {
      const cartId = req.params.cartId;
      const cartItems = await storage.getCartItems(cartId);
      
      // Get product details for each cart item
      const itemsWithProducts = await Promise.all(cartItems.map(async (item) => {
        const product = await storage.getProductById(item.productId);
        return {
          id: item.id,
          product,
          quantity: item.quantity,
          size: item.size
        };
      }));

      res.json(itemsWithProducts);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch cart items' });
    }
  });

  app.post('/api/cart', async (req, res) => {
    try {
      const result = insertCartItemSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ message: 'Invalid cart item data', errors: result.error.format() });
      }

      const cartItem = await storage.addToCart(result.data);
      const product = await storage.getProductById(cartItem.productId);
      
      res.status(201).json({
        id: cartItem.id,
        product,
        quantity: cartItem.quantity,
        size: cartItem.size
      });
    } catch (error) {
      res.status(500).json({ message: 'Failed to add item to cart' });
    }
  });

  app.put('/api/cart/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid cart item ID' });
      }

      const quantitySchema = z.object({
        quantity: z.number().int().positive()
      });

      const result = quantitySchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: 'Invalid quantity' });
      }

      const updatedItem = await storage.updateCartItemQuantity(id, result.data.quantity);
      if (!updatedItem) {
        return res.status(404).json({ message: 'Cart item not found or removed' });
      }

      const product = await storage.getProductById(updatedItem.productId);
      res.json({
        id: updatedItem.id,
        product,
        quantity: updatedItem.quantity,
        size: updatedItem.size
      });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update cart item' });
    }
  });

  app.delete('/api/cart/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid cart item ID' });
      }

      const success = await storage.removeFromCart(id);
      if (!success) {
        return res.status(404).json({ message: 'Cart item not found' });
      }

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: 'Failed to remove item from cart' });
    }
  });

  app.delete('/api/cart/clear/:cartId', async (req, res) => {
    try {
      const cartId = req.params.cartId;
      const success = await storage.clearCart(cartId);
      res.json({ success });
    } catch (error) {
      res.status(500).json({ message: 'Failed to clear cart' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
