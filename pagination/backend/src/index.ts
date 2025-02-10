import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import productRouter from './routes/product.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// middlewares
app.use('/api/products', productRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
