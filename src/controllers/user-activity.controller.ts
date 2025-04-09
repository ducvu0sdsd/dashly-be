import { UserActivityService } from './../services/user-activity.service';
import { Request, Response } from "express";
import { SuccessMessages } from "../helpers/enums/messages.enum";
import { IUserActivity } from '../models/userActivityModels';

export class UserActivityController {
    private userActivityService: UserActivityService;

    constructor() {
        this.userActivityService = new UserActivityService();
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.getByUserId = this.getByUserId.bind(this);
        this.getByDesignId = this.getByDesignId.bind(this);
        this.getByAuthorId = this.getByAuthorId.bind(this);
    }

    create(req: Request, res: Response): any {
        const body: IUserActivity = req.body;
        this.userActivityService.create(body)
            .then(created => {
                return res.status(200).json({message : SuccessMessages.CREATED_USER_ACTIVITY, data: created});
            })
            .catch(error => {
                return res.status(500).json({ message: error.message || "Internal server error" });
            });
    }

    update(req: Request, res: Response): any {
        const id = req.params.id;
        const data = req.body;
        this.userActivityService.update(id, data)
            .then(updated => {
                return res.status(200).json({message : SuccessMessages.UPDATED_USER_ACTIVITY, data: updated});
            })
            .catch(error => {
                return res.status(500).json({ message: error.message || "Internal server error" });
            });
    }

    delete(req: Request, res: Response): any {
        const id = req.params.id;
        this.userActivityService.delete(id)
            .then(deleted => {
                return res.status(200).json({message : SuccessMessages.DELETED_USER_ACTIVITY, data: deleted});
            })
            .catch(error => {
                return res.status(500).json({ message: error.message || "Internal server error" });
            });
    }
    
    getByUserId(req: Request, res: Response): any {
        const userid = req.params.userid;
        this.userActivityService.getByUserId(userid)
            .then(userActivities => {
                return res.status(200).json({data: userActivities});
            })
            .catch(error => {
                return res.status(500).json({ message: error.message || "Internal server error" });
            });
    }

    getByDesignId(req: Request, res: Response): any {
        const targetid = req.params.targetid;
        this.userActivityService.getByDesignId(targetid)
            .then(userActivities => {
                return res.status(200).json({data: userActivities});
            })
            .catch(error => {
                return res.status(500).json({ message: error.message || "Internal server error" });
            });
    }

    getByAuthorId(req: Request, res: Response): any {
        const authorId = req.params.authorid;
        this.userActivityService.getByAuthorId(authorId)
            .then(userActivities => {
                return res.status(200).json({data: userActivities});
            })
            .catch(error => {
                return res.status(500).json({ message: error.message || "Internal server error" });
            });
    }
}
