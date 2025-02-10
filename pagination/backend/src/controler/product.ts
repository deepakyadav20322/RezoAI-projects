import { Request, Response } from "express";
import { db } from "../db/index.js";
import { products } from "../db/schema.js";


// Get All Users
export const getAllProducts = async (req: Request, res: Response) => {
    try {
      const result = await db.select().from(products);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  };
  

    // post a product

    export const addProduct = async (req: Request, res: Response) => {
        try {
          const { name, description,price,category,stock } = req.body;
          await db.insert(products).values({ name, description,price,category,stock }).execute();
          res.status(201).json({ message: "User added!" });
        } catch (error) {
          res.status(500).json({ error: "Failed to add user" });
        }
      };





