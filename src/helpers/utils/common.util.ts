import crypto from "crypto";
import { IComment, ICommentResponse } from "../../models/commentModels";

export function generateOTP(): string {
    
  return crypto.randomInt(100000, 999999).toString(); // OTP 6 chữ số
  
}

export function createSlug(name: string): string {
  return name
      .toLowerCase() // Chuyển thành chữ thường
      .trim() // Xóa khoảng trắng hai đầu
      .normalize("NFD") // Chuyển ký tự có dấu thành dạng decomposed (e.g. "é" -> "e")
      .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
      .replace(/[^a-z0-9 -]/g, "") // Xóa ký tự đặc biệt (chỉ giữ chữ, số, dấu cách và "-")
      .replace(/\s+/g, "-") // Thay thế khoảng trắng bằng "-"
      .replace(/-+/g, "-"); // Xóa dấu "-" lặp lại
}