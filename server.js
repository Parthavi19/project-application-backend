import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import downloadRoutes from "./routes/download.routes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const users = []; // Temporary in-memory storage (Replace with DB later)

// Register Route
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ name, email, password: hashedPassword });
  res.json({ message: "User registered successfully" });
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.json({ token });
});

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));

app.use("/api/download", downloadRoutes);
