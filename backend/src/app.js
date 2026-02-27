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
    origin: "http://localhost:5173",
    credentials: true
  }),
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

import productRouter from "./routes/product.routes.js"
import userRouter from "./routes/user.routes.js"


app.use("/api/v1/products" , productRouter)
app.use("/api/v1/users" , userRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errors: err.errors || [],
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
});

export { app };
