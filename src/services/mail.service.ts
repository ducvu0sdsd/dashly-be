import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { generateOTP } from "../helpers/utils/common.util";

dotenv.config();

export class MailService {
    
    async sendOTP({email, otp} : {email: string, otp: string}): Promise<string | null> {
      
        const transporter = nodemailer.createTransport({
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

          await transporter.sendMail(mailOptions);

          return otp;

        } catch (error) {

          return null;
        
        }
    }
}