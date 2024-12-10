import express from "express";
import cors from "cors";

import { Request, Response } from "express";
import { ProductService } from "services/ProductService";
import { OrderService } from "services/OrderService";

const app = express();
const port = 9900;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

// Service instances
const productService = new ProductService();
const orderService = new OrderService();

// Product Routes
app.get("/products", (req: Request, res: Response) => {
  res.json(productService.getAllProducts());
});

// Order Routes
app.post("/order/create", (req: Request, res: Response) => {
  try {
    const items = req.body.items;
    const order = orderService.createOrder(items, productService);
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

app.post("/validate/code", (req: Request, res: Response) => {
  const { code } = req.body;

  try {
    const isValid = orderService.validateDiscountCode(code);
    res.json({ isValid, discount: isValid ? 10 : 0 });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// Generate discount code
app.get("/discount/code", (req: Request, res: Response) => {
  res.json({ code: orderService.generateDiscountCode() });
});

// Admin Routes
app.get("/admin/stats", (req: Request, res: Response) => {
  res.json(orderService.getOrderStats());
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
