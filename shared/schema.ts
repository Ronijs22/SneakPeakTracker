import { pgTable, text, serial, integer, boolean, doublePrecision, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Product table
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  price: doublePrecision("price").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  color: text("color").notNull(),
  images: text("images").array().notNull(),
  sizes: text("sizes").array().notNull(),
  availableColors: text("available_colors").array().notNull(),
  rating: doublePrecision("rating").notNull().default(4.5),
  reviewCount: integer("review_count").notNull().default(0),
  isFeatured: boolean("is_featured").notNull().default(false),
  isNew: boolean("is_new").notNull().default(false),
  isSale: boolean("is_sale").notNull().default(false),
  originalPrice: doublePrecision("original_price"),
});

// Cart items table
export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull(),
  quantity: integer("quantity").notNull().default(1),
  size: text("size").notNull(),
  cartId: text("cart_id").notNull(),
});

// Product insert schema
export const insertProductSchema = createInsertSchema(products).omit({
  id: true
});

// Cart items insert schema
export const insertCartItemSchema = createInsertSchema(cartItems).omit({
  id: true
});

// Types
export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type CartItem = typeof cartItems.$inferSelect;
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;
