"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../../controllers/auth.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = express_1.default.Router();
const authController = new auth_controller_1.AuthController();
const middleware = new auth_middleware_1.Middleware();
router.post("/sign-up", authController.signUpStep1);
router.post("/sign-up-step-2", authController.signUpStep2);
router.post("/sign-up-step-3", authController.signUpStep3);
router.post("/sign-in", authController.signIn);
router.post("/send-otp", authController.sendOTP);
router.post('/get-by-token', middleware.checkToken, authController.getByToken);
exports.default = router;
