import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { CreateUserInterface } from "../helpers/commons/interfaces/user.interface";

export class AuthController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
        this.signUp = this.signUp.bind(this);
    }

    signUp(req: Request, res: Response): any {
        const body: CreateUserInterface = req.body;
        this.userService.create(body)
            .then(user => {
               return res.status(200).json(user);
            })
            .catch(error => {
                console.log(error)
                return res.status(500).json({ message: error.message || "Internal server error" });
            });
    }
}
