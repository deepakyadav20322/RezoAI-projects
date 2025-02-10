import express from "express";
import { addProduct, getAllProducts } from '../controler/product.js';
const router = express.Router();


router.get("/", getAllProducts);
router.post("/add-product", addProduct);
export default router;