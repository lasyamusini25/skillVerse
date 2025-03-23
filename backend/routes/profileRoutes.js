import express from "express";
import { getProfile, updateProfile } from "../controllers/profileController.js";

const router = express.Router();

router.get("/:userid", getProfile);
router.post("/update", updateProfile);

export default router; // ✅ Ensure correct export