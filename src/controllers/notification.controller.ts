import { NotificationService } from './../services/notification.service';
import { Request, Response } from "express";
import { SuccessMessages } from "../helpers/enums/messages.enum";
import { INotification } from '../models/notificationModels';

export class NotificationController {
    private notificationService: NotificationService;

    constructor() {
        this.notificationService = new NotificationService();
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.getByUserId = this.getByUserId.bind(this);
        this.updateReadForManyNotification = this.updateReadForManyNotification.bind(this);
    }

    create(req: Request, res: Response): any {
        const body: INotification = req.body;
        this.notificationService.create(body)
            .then(created => {
                return res.status(200).json({data: created});
            })
            .catch(error => {
                return res.status(500).json({ message: error.message || "Internal server error" });
            });
    }

    update(req: Request, res: Response): any {
        const id = req.params.id;
        const data = req.body;
        this.notificationService.update(id, data)
            .then(updated => {
                return res.status(200).json({data: updated});
            })
            .catch(error => {
                return res.status(500).json({ message: error.message || "Internal server error" });
            });
    }

    updateReadForManyNotification(req: Request, res: Response): any {
        const id = req.params.id;
        this.notificationService.updateReadForManyNotification(id)
            .then(updated => {
                return res.status(200).json({data: updated});
            })
            .catch(error => {
                return res.status(500).json({ message: error.message || "Internal server error" });
            });
    }
    
    getByUserId(req: Request, res: Response): any {
        const userid = req.params.userid;
        this.notificationService.getByUserId(userid)
            .then(userActivities => {
                return res.status(200).json({data: userActivities});
            })
            .catch(error => {
                return res.status(500).json({ message: error.message || "Internal server error" });
            });
    }
}
