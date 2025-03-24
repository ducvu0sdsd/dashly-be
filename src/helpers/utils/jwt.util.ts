import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET as string;
const REFRESH_TOKEN_EXPIRES = process.env.REFRESH_TOKEN_EXPIRES as string || "5m";
const ACCESS_TOKEN_EXPIRES = process.env.ACCESS_TOKEN_EXPIRES as string || "1y";

export const generateAccessToken = (userid: string): string => {
    return jwt.sign({ userid }, ACCESS_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES } as jwt.SignOptions);
  };

export const generateRefreshToken = (userid: string): string => {
    return jwt.sign({userid}, REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES} as jwt.SignOptions);
};

export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, ACCESS_SECRET);
};

export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, REFRESH_SECRET);
};
