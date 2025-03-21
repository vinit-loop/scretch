
import express from "express";
import { registerUser, loginUser } from "../controllers/LoginController.js";
import { authMiddleware, authorizeRoles } from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post("/register", upload.single("profile"), registerUser);
router.post("/login", loginUser);

export default router;
