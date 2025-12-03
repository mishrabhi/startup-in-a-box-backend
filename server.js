import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

//ConnectDB
connectDB();

//Routes
app.use("/api/auth", authRoutes);

//Health check route
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "startup-in-a-box-backend",
    timeStamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT} `);
});
