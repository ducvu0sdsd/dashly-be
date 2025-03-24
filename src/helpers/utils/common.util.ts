import crypto from "crypto";

export function generateOTP(): string {
    
  return crypto.randomInt(100000, 999999).toString(); // OTP 6 chữ số
  
}