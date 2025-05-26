import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import connectDB from "./configs/db.js";
import "dotenv/config";
import userRouter from "./routes/userRoutes.js";
import sellerRouter from "./routes/sellerRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import addressRouter from "./routes/addressRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import { stripeWebhook } from "./controllers/orderController.js";

const app = express();

// Middleware to parse JSON
app.use(express.json());

const port = process.env.PORT || 4000;

(async () => {
  await connectDB();
  await connectCloudinary();

  const allowedOrigins = [
    "https://grocery-mern.vercel.app",
    "http://localhost:5173",
  ];

  app.post("/stripe", express.raw({ type: "application/json" }), stripeWebhook);

  app.use(cookieParser());
  app.use(cors({ origin: allowedOrigins, credentials: true }));

  app.get("/", (req, res) => res.send("API is Working"));
  app.use("/api/user", userRouter);
  app.use("/api/seller", sellerRouter);
  app.use("/api/product", productRouter);
  app.use("/api/cart", cartRouter);
  app.use("/api/address", addressRouter);
  app.use("/api/order", orderRouter);

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
})();
