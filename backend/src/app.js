import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import products from "./data/products.js"
import dotenv from "dotenv";

dotenv.config({
    path : "./.env"
});


const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORGIN,
  }),
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

import productRouter from "./routes/product.routes.js"

app.use("/api/v1/products" , productRouter)


export { app };
