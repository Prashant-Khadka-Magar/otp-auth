import express from "express";
import userRouter from "./routes/user.route.js";
import otpRouter from "./routes/otp.route.js";
import dotenv from "dotenv";
import connectdb from "./db/index.js";
import cors from "cors";

dotenv.config();

const app = express();

const PORT = 5000;
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
connectdb();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// --ROUTES------
app.use("/api/user", userRouter);
app.use("/api/otp", otpRouter);

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
