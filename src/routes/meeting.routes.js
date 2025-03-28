import express from "express";
import { scheduleMeeting, getMeetings, cancelMeeting } from "../controllers/meeting.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/schedule", authMiddleware, scheduleMeeting);
router.get("/", authMiddleware, getMeetings);
router.post("/cancel", authMiddleware, cancelMeeting);

export default router;

