import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import prisma from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 5001;  // Ensure PORT is defined

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

