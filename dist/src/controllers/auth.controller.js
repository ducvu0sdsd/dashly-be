"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const user_service_1 = require("../services/user.service");
const messages_enum_1 = require("../helpers/enums/messages.enum");
const auth_service_1 = require("../services/auth.service");
class AuthController {
    constructor() {
        this.userService = new user_service_1.UserService();
        this.authService = new auth_service_1.AuthService();
        this.signUpStep1 = this.signUpStep1.bind(this);
        this.signUpStep2 = this.signUpStep2.bind(this);
        this.signUpStep3 = this.signUpStep3.bind(this);
        this.sendOTP = this.sendOTP.bind(this);
        this.signIn = this.signIn.bind(this);
        this.getByToken = this.getByToken.bind(this);
    }
    signUpStep1(req, res) {
        const body = req.body;
        this.userService.create(body)
            .then(user => {
            return res.status(200).json({ message: messages_enum_1.SuccessMessages.COMPLETE_SIGNUP_STEP1, data: user });
        })
            .catch(error => {
            return res.status(500).json({ message: error.message || "Internal server error" });
        });
    }
    signUpStep2(req, res) {
        const { userid, otp } = req.body;
        this.authService.signUpStep2({ userid, otp })
            .then(user => {
            return res.status(200).json({ message: messages_enum_1.SuccessMessages.COMPLETE_SIGNUP_STEP2, data: user });
        })
            .catch(error => {
            return res.status(500).json({ message: error.message || "Internal server error" });
        });
    }
    signUpStep3(req, res) {
        const data = req.body;
        this.authService.signUpStep3(data)
            .then(user => {
            return res.status(200).json({ message: messages_enum_1.SuccessMessages.COMPLETE_SIGNUP_STEP3, data: user });
        })
            .catch(error => {
            return res.status(500).json({ message: error.message || "Internal server error" });
        });
    }
    sendOTP(req, res) {
        const { email, answer } = req.body;
        this.authService.sendOTP(email)
            .then(data => {
            return res.status(200).json({ message: answer ? messages_enum_1.SuccessMessages.RESEND_OTP : null, data });
        })
            .catch(error => {
            return res.status(500).json({ message: error.message || "Internal server error" });
        });
    }
    signIn(req, res) {
        const { username, password } = req.body;
        this.authService.signIn({ username, password })
            .then(user => {
            return res.status(200).json({ message: messages_enum_1.SuccessMessages.COMPLETE_SIGNIN, data: user });
        })
            .catch(error => {
            return res.status(500).json({ message: error.message || "Internal server error" });
        });
    }
    getByToken(req, res) {
        const { user_id } = req;
        this.userService.getById(user_id)
            .then(user => {
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json(user);
        })
            .catch(error => {
            return res.status(500).json({ message: error.message || "Internal server error" });
        });
    }
}
exports.AuthController = AuthController;
