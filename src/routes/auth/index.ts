import express from "express";
import { AuthController } from "../../controllers/auth.controller";

const router = express.Router();

const authController = new AuthController()

router.post("/sign-up", authController.signUpStep1)

router.post("/sign-up-step-2", authController.signUpStep2)

router.post("/sign-up-step-3", authController.signUpStep3)

router.post("/sign-in", authController.signIn)

router.post("/send-otp", authController.sendOTP)

export default router;
