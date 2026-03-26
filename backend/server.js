import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/mongoose.js";
import authRoutes from "./routes/authRoutes.js";
import favouriteRoutes from "./routes/favouriteRoutes.js";

dotenv.config();
connectDB(); 

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/favourites", favouriteRoutes);

app.get("/", (req, res) => {
  res.send("Backend running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`port ${PORT}`));