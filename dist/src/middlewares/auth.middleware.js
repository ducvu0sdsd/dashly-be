"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_service_1 = require("../services/auth.service");
class Middleware {
    constructor() {
        this.checkToken = (req, res, next) => {
            try {
                const authHeader = req.headers.authorization;
                const refreshToken = req.headers["x-refresh-token"];
                if (!authHeader || !refreshToken) {
                    res.status(400).json({ error: "Missing authentication details" });
                    return;
                }
                const accessToken = authHeader.split(" ")[1];
                if (!accessToken) {
                    res.status(401).json({ error: "Access token is missing" });
                    return;
                }
                jsonwebtoken_1.default.verify(accessToken, process.env.SECRETKEY, (err, decodedAccessToken) => {
                    if (err) {
                        jsonwebtoken_1.default.verify(refreshToken, process.env.SECRETKEY, (error, decodedRefreshToken) => __awaiter(this, void 0, void 0, function* () {
                            if (error) {
                                res.status(401).json({ error: "Refresh token expired, please log in again" });
                                return;
                            }
                            const expR = decodedRefreshToken.exp * 1000;
                            const currentTimestamp = Date.now();
                            const remainTime = `${(expR - currentTimestamp) / 1000}s`;
                            try {
                                const newTokens = yield this.authService.generateTokens({
                                    user_id: decodedRefreshToken.user_id,
                                    remainTime,
                                });
                                req.user_id = decodedRefreshToken.user_id;
                                req.tokens = newTokens;
                                return next(); // 🔹 Đảm bảo return next()
                            }
                            catch (genError) {
                                console.error("Token generation failed:", genError);
                                res.status(500).json({ error: "Failed to generate new tokens" });
                                return;
                            }
                        }));
                    }
                    else {
                        req.user_id = decodedAccessToken.user_id;
                        req.tokens = { accessToken, refreshToken };
                        return next(); // 🔹 Đảm bảo return next()
                    }
                });
            }
            catch (error) {
                console.error("Token verification error:", error);
                res.status(500).json({ error: "Internal server error" });
                return;
            }
        };
        this.authService = new auth_service_1.AuthService();
    }
}
exports.Middleware = Middleware;
