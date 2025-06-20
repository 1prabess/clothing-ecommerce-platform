import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDb from "./config/db.js";
import responseFormatter from "./middlewares/response.middleware.js";
import authRouter from "./routes/auth.route.js";
import productRouter from "./routes/product.route.js";
import orderRouter from "./routes/order.route.js";
import reviewRouter from "./routes/review.route.js";
import cartRouter from "./routes/cart.route.js";
import paymentRouter from "./routes/payment.route.js";

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(cookieParser());
app.use(responseFormatter);

app.use("/api", authRouter);
app.use("/api", productRouter);
app.use("/api", orderRouter);
app.use("/api", reviewRouter);
app.use("/api", cartRouter);
app.use("/api", paymentRouter);

app.listen(PORT, async () => {
  try {
    await connectDb();
    console.log(`App is listening on port: ${PORT}`);
  } catch (error) {
    console.log("Error in listening by app");
  }
});
