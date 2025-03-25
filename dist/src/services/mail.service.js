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
exports.MailService = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const nodemailer_1 = __importDefault(require("nodemailer"));
dotenv_1.default.config();
class MailService {
    sendOTP(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, otp }) {
            const transporter = nodemailer_1.default.createTransport({
                host: process.env.SMTP_HOST,
                port: Number(process.env.SMTP_PORT),
                secure: true,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
            });
            const mailOptions = {
                from: process.env.SMTP_USER,
                to: email,
                subject: "Mã OTP xác thực của bạn",
                text: `Mã OTP của bạn là: ${otp}. Vui lòng không chia sẻ với ai.`,
                html: `<p>Mã OTP của bạn là: <b>${otp}</b></p><p>Vui lòng không chia sẻ với ai.</p>`,
            };
            try {
                yield transporter.sendMail(mailOptions);
                return otp;
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.MailService = MailService;
