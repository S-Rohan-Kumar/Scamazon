import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import products from "./data/products.js"
import dotenv from "dotenv";
import path from 'path';

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
import orderRouter from "./routes/order.routes.js"


app.use("/api/v1/products" , productRouter)
app.use("/api/v1/users" , userRouter)
app.use("/api/v1/orders" , orderRouter)



app.get('/api/v1/config/paypal', (req, res) =>
  res.send({clientId : process.env.PAYPAL_CLIENT_ID})
)

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));  
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}



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
