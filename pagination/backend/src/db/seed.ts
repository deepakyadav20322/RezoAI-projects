import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { config } from "dotenv";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

config();

// 🌍 Setup Database Connection (Turso)
const client = createClient({
  url: process.env.TURSO_CONNECTION_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});
const db = drizzle(client);

// 📦 Define Products Table Schema (Based on Your Schema)
const products = sqliteTable("products", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  category: text("category").notNull(),
  stock: integer("stock").notNull(),
});

// 🔹 Generate 20 Dummy Products
const categories = ["Electronics", "Clothing", "Home & Kitchen", "Books", "Toys"];

const dummyProducts = Array.from({ length: 20 }).map((_, i) => ({
  name: `Product ${i + 1}`,
  description: `Description for Product ${i + 1}`,
  price: Math.floor(Math.random() * 100) + 10, // Random price between 10-100
  category: categories[i % categories.length], // Assigning category in rotation
  stock: Math.floor(Math.random() * 50) + 1, // Random stock between 1-50
}));

// �� Insert Dummy Data
async function seed() {
  try {
    await db.insert(products).values(dummyProducts);
    console.log("✅ 20 Dummy Products Added Successfully!");
  } catch (error) {
    console.error("❌ Error inserting dummy products:", error);
  } finally {
    await client.close();
  }
}

// Run the script
seed();
