import { Request, Response } from "express";
import { SuccessMessages } from "../helpers/enums/messages.enum";
import { CommentService } from "../services/comment.service";
import { IComment } from "../models/commentModels";

export class CommentController {

    private commentService: CommentService;

    constructor() {
        this.commentService = new CommentService();
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.getByUserId = this.getByUserId.bind(this);
        this.getByDesignId = this.getByDesignId.bind(this);
        this.getByCommentId = this.getByCommentId.bind(this);
        this.likeOrDislikeComment = this.likeOrDislikeComment.bind(this);
        this.getNumberOfCommentByDesignId = this.getNumberOfCommentByDesignId.bind(this)
    }

    create(req: Request, res: Response): any {
        const body: IComment = req.body;
        this.commentService.create(body)
            .then(created => {
                return res.status(200).json({message : SuccessMessages.CREATED_COMMENT, data: created});
            })
            .catch(error => {
                return res.status(500).json({ message: error.message || "Internal server error" });
            });
    }

    update(req: Request, res: Response): any {
        const id = req.params.id;
        const data = req.body;
        this.commentService.update(id, data)
            .then(updated => {
                return res.status(200).json({message : SuccessMessages.UPDATED_COMMENT, data: updated});
            })
            .catch(error => {
                return res.status(500).json({ message: error.message || "Internal server error" });
            });
    }

    delete(req: Request, res: Response): any {
        const id = req.params.id;
        this.commentService.delete(id)
            .then(deleted => {
                return res.status(200).json({message : SuccessMessages.DELETED_COMMENT, data: deleted});
            })
            .catch(error => {
                return res.status(500).json({ message: error.message || "Internal server error" });
            });
    }
    
    getByUserId(req: Request, res: Response): any {
        const userid = req.params.userid;
        this.commentService.getByUserId(userid)
            .then(userActivities => {
                return res.status(200).json({data: userActivities});
            })
            .catch(error => {
                return res.status(500).json({ message: error.message || "Internal server error" });
            });
    }

    getByDesignId(req: Request, res: Response): any {
        const targetid = req.params.targetid;
        this.commentService.getByDesignId(targetid)
            .then(userActivities => {
                return res.status(200).json({data: userActivities});
            })
            .catch(error => {
                return res.status(500).json({ message: error.message || "Internal server error" });
            });
    }

    getNumberOfCommentByDesignId(req: Request, res: Response): any {
        const targetid = req.params.targetid;
        this.commentService.getNumberOfCommentByDesignId(targetid)
            .then(userActivities => {
                return res.status(200).json({data: userActivities});
            })
            .catch(error => {
                return res.status(500).json({ message: error.message || "Internal server error" });
            });
    }

    getByCommentId(req: Request, res: Response): any {
        const {commentId, targetId} = req.body;
        this.commentService.getByCommentId(commentId, targetId)
            .then(userActivities => {
                return res.status(200).json({data: userActivities});
            })
            .catch(error => {
                return res.status(500).json({ message: error.message || "Internal server error" });
            });
    }

    likeOrDislikeComment(req: Request, res: Response): any {
        const {commentId, userId, type} = req.body;
        this.commentService.likeOrDislikeComment(commentId, userId, type)
            .then(commentUpdated => {
                return res.status(200).json({data: commentUpdated});
            })
            .catch(error => {
                return res.status(500).json({ message: error.message || "Internal server error" });
            });
    }
}
