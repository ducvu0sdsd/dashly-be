import { FailMessages } from "../helpers/enums/messages.enum";
import followingModels from "../models/followingModels";
import { IFollowing } from "../models/followingModels";

export class FollowingService {

    public followUser = async (data: IFollowing): Promise<any> => {
        try {
            const {follower, following} = data
            
            if (follower === following) {
                throw new Error(FailMessages.FOLLOWMYSEFT)
            }

            const result = await followingModels.create({follower, following})

            return result;
        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    };

    public unFollowUser = async (data: IFollowing): Promise<any> => {
        try {
            const result = await followingModels.deleteOne({
                follower: data.follower,
                following: data.following
            })

            if (result.deletedCount > 0) {
                return true;
            } else {
                throw new Error(FailMessages.COMMON)
            }
        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    };

    public getFollowers = async (follower: string): Promise<any> => {
        try {
            const followers = await followingModels.find({ 
                follower: follower,
            })

            return followers
        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    };

    public getFollowings = async (following: string): Promise<any> => {
        try {
            const followings = await followingModels.find({ 
                following: following,
            })

            return followings
        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    };
}