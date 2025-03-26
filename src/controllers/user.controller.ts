import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { CreateUserInterface } from "../helpers/interfaces/user.interface";
import { IUser } from "../models/userModels";
import { SuccessMessages } from "../helpers/enums/messages.enum";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
    }

    create(req: Request, res: Response): any {
        const body: CreateUserInterface = req.body;
        this.userService.create(body)
            .then(user => {
               return res.status(200).json({message : SuccessMessages.CREATE_USER, data: user});
            })
            .catch(error => {
                return res.status(500).json({ message: error.message || "Internal server error" });
            });
    }

    update(req: Request, res: Response): any {
        const id = req.params.id;
        const data = req.body;
        this.userService.update({id, data})
            .then(user => {
                return res.status(200).json({message : SuccessMessages.UPDATE_USER, data: user});
            })
            .catch(error => {
                return res.status(500).json({ message: error.message || "Internal server error" });
            });
    }

    delete(req: Request, res: Response): any {
        const id = req.params.id;
        this.userService.delete(id)
            .then(deleted => {
                return res.status(200).json({message : SuccessMessages.DELETE_USER, data: deleted});
            })
            .catch(error => {
                return res.status(500).json({ message: error.message || "Internal server error" });
            });
    }

    getAll(req: Request, res: Response): any {
        this.userService.getAll()
            .then(users => {
                return res.status(200).json(users);
            })
            .catch(error => {
                return res.status(500).json({ message: error.message || "Internal server error" });
            });
    }

    getById(req: Request, res: Response): any {
        const id = req.params.id;
        this.userService.getById(id)
            .then(user => {
                if(!user) {
                    return res.status(500).json({ message: user });
                }
                return res.status(200).json(user);
            })
            .catch(error => {
                return res.status(500).json({ message: error.message || "Internal server error" });
            });
    }

    
}
