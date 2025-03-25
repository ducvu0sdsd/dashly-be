import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { CreateUserInterface, UserInformationInterface } from "../helpers/interfaces/user.interface";
import { MailService } from "../services/mail.service";
import { SuccessMessages } from "../helpers/enums/messages.enum";
import { AuthService } from "../services/auth.service";
import { TokensInterface } from "../helpers/interfaces/auth.interface";

export class AuthController {
    private userService: UserService;
    private authService: AuthService;

    constructor() {
        this.userService = new UserService()
        this.authService = new AuthService()
        this.signUpStep1 = this.signUpStep1.bind(this);
        this.signUpStep2 = this.signUpStep2.bind(this);
        this.signUpStep3 = this.signUpStep3.bind(this);
        this.sendOTP = this.sendOTP.bind(this);
        this.signIn = this.signIn.bind(this);
        this.getByToken = this.getByToken.bind(this);
    }

    signUpStep1(req: Request, res: Response): any {
        const body: CreateUserInterface = req.body;
        this.userService.create(body)
            .then(user => {
                return res.status(200).json({message : SuccessMessages.COMPLETE_SIGNUP_STEP1, data: user});
            })
            .catch(error => {
                return res.status(500).json({ message: error.message || "Internal server error" });
            });
    }

    signUpStep2(req: Request, res: Response): any {
        const {userid, otp} = req.body;
        this.authService.signUpStep2({userid, otp})
            .then(user => {
                return res.status(200).json({message : SuccessMessages.COMPLETE_SIGNUP_STEP2, data: user});
            })
            .catch(error => {
                return res.status(500).json({ message: error.message || "Internal server error" });
            });
    }

    signUpStep3(req: Request, res: Response): any {
        const data:UserInformationInterface = req.body;
        this.authService.signUpStep3(data)
            .then(user => {
                return res.status(200).json({message : SuccessMessages.COMPLETE_SIGNUP_STEP3, data: user});
            })
            .catch(error => {
                return res.status(500).json({ message: error.message || "Internal server error" });
            });
    }

    sendOTP(req: Request, res: Response): any {
        const {email, answer} = req.body;
        this.authService.sendOTP(email)
            .then(data => {
                return res.status(200).json({message : answer ? SuccessMessages.RESEND_OTP : null, data});
            })
            .catch(error => {
                return res.status(500).json({ message: error.message || "Internal server error" });
            });
    }

    signIn(req: Request, res: Response): any {
        const {username, password} = req.body;
        this.authService.signIn({username, password})
            .then(user => {
                return res.status(200).json({message : SuccessMessages.COMPLETE_SIGNIN, data: user});
            })
            .catch(error => {
                return res.status(500).json({ message: error.message || "Internal server error" });
            });
    }

    getByToken(req: Request, res: Response): void {
        const { user_id, tokens } = req as Request & { user_id?: string, tokens?: TokensInterface };

        this.userService.getById(user_id as string)
            .then(user => {
                return res.status(200).json({tokens, data: user});
            })
            .catch(error => {
                return res.status(500).json({ message: error.message || "Internal server error" });
            });
    }

}
