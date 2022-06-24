import express from "express";
import { login, register, logout } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register)
router.post("/", login)
router.get("/deleteCookie", logout)

export default router