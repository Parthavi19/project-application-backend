import express from "express";
import { downloadStudentProjectData } from "../controllers/download.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js"; // to protect the route

const router = express.Router();

// This route will allow only authenticated users (e.g., faculty or admin) to download
router.get("/students", authMiddleware, downloadStudentProjectData);

export default router;

