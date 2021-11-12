import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/users.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the kitchen...");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`MongoDB Connected and server running on port: ${PORT}`);
    })
  )
  .catch((err) => {
    console.log(err.message);
  });
