import express from "express";
import { FollowingController } from "../../controllers/following.controller";
import { Middleware } from "../../middlewares/auth.middleware";

const router = express.Router();

const followingController = new FollowingController()

const middleware = new Middleware()

router.post("/follow-user", middleware.checkToken, followingController.followUser )

router.delete("/unfollow-user", middleware.checkToken, followingController.unFollowUser )

router.get("/get-followers/:follower", middleware.checkToken, followingController.getFollowers )

router.get("/get-followings/:following", middleware.checkToken, followingController.getFollowings )

export default router;
