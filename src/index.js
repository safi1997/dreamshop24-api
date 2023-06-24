import express from "express";
import "./config/Database.js";
import customerRoute from "./controller/customer-route.js";
import productRoute from "./controller/product-route.js"
import cors from "cors";
import morgan from "morgan";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

// API
app.use(errorHandler);
app.use("/api/v1/customers", customerRoute)
app.use("/api/v1/products", productRoute)
export default app;