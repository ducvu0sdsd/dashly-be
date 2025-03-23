import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
        this.create = this.create.bind(this);
    }

    create(req: Request, res: Response): void {
        this.userService.create()
            .then(user => {
                res.status(201).json({ message: "User created successfully", user });
            })
            .catch(error => {
                res.status(500).json({ message: "Internal server error", error });
            });
    }
}
