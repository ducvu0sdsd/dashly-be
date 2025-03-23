import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { CreateUserInterface } from "../helpers/commons/interfaces/user.interface";

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
               return res.status(200).json(user);
            })
            .catch(error => {
                res.status(500).json({ message: "Internal server error", error });
            });
    }

    update(req: Request, res: Response): any {
        const id = req.params.id;
        const data = req.body;
        this.userService.update(id, data)
            .then(user => {
                if(user === 0) {
                    return res.status(500).json({ message: "User not found" });
                }
                if(!user) {
                    return res.status(500).json({ message: user });
                }
                return res.status(200).json(user);
            })
            .catch(error => {
                res.status(500).json({ message: "Internal server error", error });
            });
    }

    delete(req: Request, res: Response): any {
        const id = req.params.id;
        this.userService.delete(id)
            .then(user => {
                if(user === 0) {
                    return res.status(500).json({ message: "User not found" });
                }
                if(!user) {
                    return res.status(500).json({ message: user });
                }
                return res.status(200).json({deleted: user});
            })
            .catch(error => {
                res.status(500).json({ message: "Internal server error", error });
            });
    }

    getAll(req: Request, res: Response): any {
        this.userService.getAll()
            .then(users => {
                return res.status(200).json(users);
            })
            .catch(error => {
                res.status(500).json({ message: "Internal server error", error });
            });
    }

    getById(req: Request, res: Response): any {
        const id = req.params.id;
        this.userService.getById(id)
            .then(user => {
                if(user === 0) {
                    return res.status(500).json({ message: "User not found" });
                }
                if(!user) {
                    return res.status(500).json({ message: user });
                }
                return res.status(200).json(user);
            })
            .catch(error => {
                res.status(500).json({ message: "Internal server error", error });
            });
    }
}
