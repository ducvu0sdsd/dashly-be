import express from "express";
import { AuthController } from "../../controllers/auth.controller";
import { Middleware } from "../../middlewares/auth.middleware";

const router = express.Router();

const authController = new AuthController()

const middleware = new Middleware()

router.post("/sign-up", authController.signUpStep1)

router.post("/sign-up-step-2", authController.signUpStep2)

router.post("/sign-up-step-3", authController.signUpStep3)

router.post("/sign-in", authController.signIn)

router.post("/send-otp", authController.sendOTP)

router.post("/forgot-password", authController.forgotPassword)

router.post('/get-by-token', middleware.checkToken ,authController.getByToken)

router.put('/reset-password/:userid', middleware.checkToken, authController.resetPassword)

router.delete('/delete-account/:id', middleware.checkToken, authController.deleteAccount)

export default router;
