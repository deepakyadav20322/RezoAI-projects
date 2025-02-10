import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const products = sqliteTable("products", {
    id: integer("id").primaryKey().unique(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    price: integer("price").notNull(),
    category: text("category").notNull(),
    stock: integer("stock").notNull(),
});

