import { UserActivityService } from '../services/user-activity.service';
import { Request, Response } from "express";
import { SuccessMessages } from "../helpers/enums/messages.enum";
import { IUserActivity } from '../models/userActivityModels';
import { FollowingService } from '../services/following.service';
import { IFollowing } from '../models/followingModels';

export class FollowingController {
    private followingService!: FollowingService;

    constructor() {
        this.followingService = new FollowingService();
        this.followUser = this.followUser.bind(this);
        this.unFollowUser = this.unFollowUser.bind(this);
        this.getFollowers = this.getFollowers.bind(this);
        this.getFollowings = this.getFollowings.bind(this);
    }

    followUser(req: Request, res: Response): any {
        const body: IFollowing = req.body;
        this.followingService.followUser(body)
            .then(created => {
                return res.status(200).json({message : SuccessMessages.FOLLOW_USER, data: created});
            })
            .catch(error => {
                return res.status(500).json({ message: error.message || "Internal server error" });
            });
    }

    unFollowUser(req: Request, res: Response): any {
        const body: IFollowing = req.body;
        this.followingService.unFollowUser(body)
            .then(created => {
                return res.status(200).json({message : SuccessMessages.UNFOLLOW_USER, data: created});
            })
            .catch(error => {
                console.log(error)
                return res.status(500).json({ message: error.message || "Internal server error" });
            });
    }

    getFollowers(req: Request, res: Response): any {
        const {follower} = req.params;
        this.followingService.getFollowers(follower)
            .then(followers => {
                return res.status(200).json({ data: followers });
            })
            .catch(error => {
                return res.status(500).json({ message: error.message || "Internal server error" });
            });
    }

    getFollowings(req: Request, res: Response): any {
        const {following} = req.params;
        this.followingService.getFollowings(following)
            .then(followings => {
                return res.status(200).json({ data: followings });
            })
            .catch(error => {
                return res.status(500).json({ message: error.message || "Internal server error" });
            });
    }
}
