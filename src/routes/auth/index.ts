import express from "express";
import { AuthController } from "../../controllers/auth.controller";

const router = express.Router();

const authController = new AuthController()

router.post("/sign-up", authController.signUp)

export default router;
