import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { generateOTP } from "../helpers/utils/common.util";

dotenv.config();

export class MailService {
    
    async sendOTP({email, subject, text, html, otp} : {otp: string,email: string, subject: string, text: string, html: string}): Promise<string | null> {
      
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
          subject,
          text,
          html,
        };
      
        try {

          await transporter.sendMail(mailOptions);

          return otp;

        } catch (error) {

          return null;
        
        }
    }
}