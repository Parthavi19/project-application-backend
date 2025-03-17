import express from "express";
import {
  createProject,
  getProjects,
  applyForProject,
  handleApplication,
} from "../controllers/project.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createProject); // Faculty can create projects
router.get("/", getProjects); // Anyone can see available projects
router.post("/apply", authMiddleware, applyForProject); // Students apply
router.post("/application", authMiddleware, handleApplication); // Faculty approves/rejects

export default router;

