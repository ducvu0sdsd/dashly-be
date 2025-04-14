import { Request, Response } from "express";
import { DesignService } from "../services/design.service";
import { CreateDesignInterface } from "../helpers/interfaces/design.interface";
import { SuccessMessages } from "../helpers/enums/messages.enum";
import { TokensInterface } from "../helpers/interfaces/auth.interface";

export class DesignController {
    private designService: DesignService;

    constructor() {
        this.designService = new DesignService();
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.getByUserId = this.getByUserId.bind(this);
        this.getBySlug = this.getBySlug.bind(this);
        this.getByCreatedAtAndName = this.getByCreatedAtAndName.bind(this);
        this.getByTypeAndCreatedAtAndName = this.getByTypeAndCreatedAtAndName.bind(this);
        this.aprroveVerification = this.aprroveVerification.bind(this);
    }

    create(req: Request, res: Response): any {
        const { tokens } = req as Request & { tokens?: TokensInterface };
        const body: CreateDesignInterface = req.body;
        this.designService.create(body)
            .then(design => {
                return res.status(200).json({message : SuccessMessages.CREATED_DESIGN, data: design, tokens});
            })
            .catch(error => {
                return res.status(500).json({ message: error.message || "Internal server error" , tokens});
            });
    }

    update(req: Request, res: Response): any {
        const id = req.params.id;
        const data = req.body;
        const { tokens } = req as Request & { tokens?: TokensInterface };
        this.designService.update(id, data)
            .then(design => {
                return res.status(200).json({message : SuccessMessages.UPDATED_DESIGN, data: design, tokens});
            })
            .catch(error => {
                return res.status(500).json({ message: error.message || "Internal server error" , tokens});
            });
    }

    delete(req: Request, res: Response): any {
        const { tokens } = req as Request & { tokens?: TokensInterface };
        const id = req.params.id;
        this.designService.delete(id)
            .then(design => {
                return res.status(200).json({message : SuccessMessages.DELETED_DESIGN, data: design, tokens});
            })
            .catch(error => {
                return res.status(500).json({ message: error.message || "Internal server error" , tokens});
            });
    }

    getAll(req: Request, res: Response): any {
        this.designService.getAll()
            .then(designs => {
                return res.status(200).json({data: designs});
            })
            .catch(error => {
                return res.status(500).json({ message: error.message || "Internal server error" });
            });
    }

    getById(req: Request, res: Response): any {
        const id = req.params.id;
        this.designService.getById(id)
            .then(design => {
                return res.status(200).json({data: design});
            })
            .catch(error => {
                return res.status(500).json({ message: error.message || "Internal server error" });
            });
    }

    getBySlug(req: Request, res: Response): any {
        const {slug} = req.params;
        this.designService.getBySlug(slug)
            .then(design => {
                return res.status(200).json({data: design});
            })
            .catch(error => {
                return res.status(500).json({ message: error.message || "Internal server error" });
            });
    }
    
    getByUserId(req: Request, res: Response): any {
        const userid = req.params.userid;
        this.designService.getByUserId(userid)
            .then(designs => {
                return res.status(200).json({data: designs});
            })
            .catch(error => {
                return res.status(500).json({ message: error.message || "Internal server error" });
            });
    }

    getByCreatedAtAndName(req: Request, res: Response): any {
        const {created, name} = req.params;
        this.designService.getByCreatedAtAndName(created, name)
            .then(designs => {
                return res.status(200).json({data: designs});
            })
            .catch(error => {
                return res.status(500).json({ message: error.message || "Internal server error" });
            });
    }

    getByTypeAndCreatedAtAndName(req: Request, res: Response): any {
        const {created, type, name} = req.params;
        this.designService.getByDesignTypeAndCreatedAtAndName(type, created, name)
            .then(designs => {
                return res.status(200).json({data: designs});
            })
            .catch(error => {
                return res.status(500).json({ message: error.message || "Internal server error" });
            });
    }

    aprroveVerification(req: Request, res: Response): any {
        const id = req.params.id;
        const data = req.body;
        const { tokens } = req as Request & { tokens?: TokensInterface };
        this.designService.aprroveVerification(id, data)
            .then(design => {
                return res.status(200).json({message : SuccessMessages.UPDATED_DESIGN, data: design, tokens});
            })
            .catch(error => {
                return res.status(500).json({ message: error.message || "Internal server error" , tokens});
            });
    }
}
