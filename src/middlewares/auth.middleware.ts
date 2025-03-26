import jwt from "jsonwebtoken";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { AuthService } from "../services/auth.service";

export class Middleware {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    checkToken: RequestHandler = (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            const refreshToken = req.headers["x-refresh-token"] as string;

            if (!authHeader || !refreshToken) {
                res.status(500).json({ message: '', error: "Missing authentication details" });
                return; 
            }

            const accessToken = authHeader.split(" ")[1];
            if (!accessToken) {
                res.status(401).json({ message: '', error: "Access token is missing" });
                return;
            }

            jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string, (err, decodedAccessToken) => {

                if (err) {
                    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, async (error, decodedRefreshToken) => {
                        if (error) {
                            res.status(401).json({ message: '', error: "Refresh token expired, please log in again" });
                            return;
                        }

                        const expR = (decodedRefreshToken as any).exp * 1000;
                        const currentTimestamp = Date.now();
                        const remainTime = `${(expR - currentTimestamp) / 1000}s`;

                        try {
                            const newTokens = this.authService.generateTokens({
                                user_id: (decodedRefreshToken as any).user_id,
                                remainTime,
                            });
                            
                            req.user_id = (decodedRefreshToken as any).user_id;
                            req.tokens = newTokens;
                            return next();
                        } catch (genError) {
                            res.status(500).json({ message: '', error: "Failed to generate new tokens" });
                            return;
                        }
                    });
                } else {
                    req.user_id = (decodedAccessToken as any).user_id;
                    req.tokens = { accessToken, refreshToken };
                    return next();
                }
            });
        } catch (error) {
            console.error("Token verification error:", error);
            res.status(500).json({ error: "Internal server error" });
            return;
        }
    };
}
