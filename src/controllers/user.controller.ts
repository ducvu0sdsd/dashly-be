import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { CreateUserInterface } from "../helpers/interfaces/user.interface";
import { IUser } from "../models/userModels";
import { SuccessMessages } from "../helpers/enums/messages.enum";
import { TokensInterface } from "../helpers/interfaces/auth.interface";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.getBySlug = this.getBySlug.bind(this);
        this.getInformationBySlug = this.getInformationBySlug.bind(this);
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
        const { tokens } = req as Request & { tokens?: TokensInterface };
        const id = req.params.id;
        const data = req.body;
        this.userService.update({id, data})
            .then(user => {
                return res.status(200).json({message : SuccessMessages.UPDATE_USER, data: user, tokens});
            })
            .catch(error => {
                return res.status(500).json({ message: error.message || "Internal server error" , tokens});
            });
    }

    delete(req: Request, res: Response): any {
        const { tokens } = req as Request & { tokens?: TokensInterface };
        const id = req.params.id;
        this.userService.delete(id)
            .then(deleted => {
                return res.status(200).json({message : SuccessMessages.DELETE_USER, data: deleted, tokens});
            })
            .catch(error => {
                return res.status(500).json({ message: error.message || "Internal server error", tokens });
            });
    }

    getAll(req: Request, res: Response): any {
        this.userService.getAll()
            .then(users => {
                return res.status(200).json({data: users});
            })
            .catch(error => {
                return res.status(500).json({ message: error.message || "Internal server error" });
            });
    }

    getById(req: Request, res: Response): any {
        const id = req.params.id;
        this.userService.getById(id, true)
            .then(user => {
                return res.status(200).json({data: user});
            })
            .catch(error => {
                return res.status(500).json({ message: error.message || "Internal server error" });
            });
    }

    getBySlug(req: Request, res: Response): any {
        const slug = req.params.slug;
        this.userService.getBySlug(slug)
            .then(user => {
                return res.status(200).json({data: user});
            })
            .catch(error => {
                return res.status(500).json({ message: error.message || "Internal server error" });
            });
    }

    getInformationBySlug(req: Request, res: Response): any {
        const slug = req.params.slug;
        this.userService.getInformationBySlug(slug)
            .then(data => {
                return res.status(200).json({data: data});
            })
            .catch(error => {
                return res.status(500).json({ message: error.message || "Internal server error" });
            });
    }

}
