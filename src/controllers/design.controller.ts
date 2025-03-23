import { Request, Response } from "express";
import { DesignService } from "../services/design.service";
import { CreateDesignInterface } from "../helpers/commons/interfaces/design.interface";

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
    }

    create(req: Request, res: Response): any {
        const body: CreateDesignInterface = req.body;
        this.designService.create(body)
            .then(design => {
                if(design === "Not found user") {
                    return res.status(500).json({ message: "User not found" });
                }
               return res.status(200).json(design);
            })
            .catch(error => {
                res.status(500).json({ message: "Internal server error", error });
            });
    }

    update(req: Request, res: Response): any {
        const id = req.params.id;
        const data = req.body;
        this.designService.update(id, data)
            .then(design => {
                if(design === 0) {
                    return res.status(500).json({ message: "Design not found" });
                }
                if(!design) {
                    return res.status(500).json({ message: design });
                }
                return res.status(200).json(design);
            })
            .catch(error => {
                res.status(500).json({ message: "Internal server error", error });
            });
    }

    delete(req: Request, res: Response): any {
        const id = req.params.id;
        this.designService.delete(id)
            .then(design => {
                if(design === 0) {
                    return res.status(500).json({ message: "Design not found" });
                }
                if(!design) {
                    return res.status(500).json({ message: design });
                }
                return res.status(200).json({deleted: design});
            })
            .catch(error => {
                res.status(500).json({ message: "Internal server error", error });
            });
    }

    getAll(req: Request, res: Response): any {
        this.designService.getAll()
            .then(designs => {
                return res.status(200).json(designs);
            })
            .catch(error => {
                res.status(500).json({ message: "Internal server error", error });
            });
    }

    getById(req: Request, res: Response): any {
        const id = req.params.id;
        this.designService.getById(id)
            .then(design => {
                if(design === 0) {
                    return res.status(500).json({ message: "Design not found" });
                }
                if(!design) {
                    return res.status(500).json({ message: design });
                }
                return res.status(200).json(design);
            })
            .catch(error => {
                res.status(500).json({ message: "Internal server error", error });
            });
    }
    
    getByUserId(req: Request, res: Response): any {
        const userid = req.params.userid;
        this.designService.getByUserId(userid)
            .then(designs => {
                if(designs === "Not found user") {
                    return res.status(500).json({ message: "User not found" });
                }
                return res.status(200).json(designs);
            })
            .catch(error => {
                res.status(500).json({ message: "Internal server error", error });
            });
    }
}
