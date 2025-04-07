import express from "express";
import { CommentController } from "../../controllers/comment.controller";

const router = express.Router();

const commentController = new CommentController()

router.get("/get-by-user/:userid", commentController.getByUserId)

router.delete("/:id", commentController.delete)

router.put("/:id", commentController.update)

router.post("/", commentController.create)

router.get("/get-by-design/:targetid", commentController.getByDesignId)

router.post("/get-by-comment", commentController.getByCommentId)

router.post("/like-or-dislike", commentController.likeOrDislikeComment)

router.get("/get-number-of-comment-by-design/:targetid", commentController.getNumberOfCommentByDesignId)

export default router;
