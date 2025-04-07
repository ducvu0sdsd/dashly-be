import { FailMessages } from "../helpers/enums/messages.enum";
import { UserService } from "./user.service";
import { DesignService } from "./design.service";
import commentModels, { IComment, ICommentResponse } from "../models/commentModels";
import { Like_Dislike } from "../helpers/enums/user-activity.enum";

export class CommentService {

    private userService!: UserService

    private designService!: DesignService

    public create = async (data: IComment): Promise<IComment> => {
        try {
            this.userService = new UserService()

            this.designService = new DesignService()

            const {author, targetId, content, images, reply} = data
            
            const existUser = await this.userService.getById(author._id)

            if(!existUser) {
                throw new Error(FailMessages.NOT_FOUND_USER)
            } 

            const existDesign = await this.designService.getById(targetId)

            if(!existDesign) {
                throw new Error(FailMessages.NOT_FOUND_DESIGN)
            } 

            const result = await commentModels.create({author, targetId, content, images, reply})

            return result;
        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    };

    public update = async (id: string, data: any): Promise<any> => {
        try {
            const exist = await commentModels.findById(id);

            if (!exist) {
                throw new Error(FailMessages.NOT_FOUND_USER_ACTIVITY)
            }

            const result = await commentModels.findByIdAndUpdate(id, data, { new: true, runValidators: true });

            return result;
        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    };

    public delete = async (id: string): Promise<any> => {
        try {
            const exist = await commentModels.findById(id);

            if (!exist) {
                throw new Error(FailMessages.NOT_FOUND_USER_ACTIVITY)
            }

            const result = await commentModels.findByIdAndDelete(id);

            if (!result) {
                throw new Error(FailMessages.DELETE_DESIGN)
            }
            return true;
        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    };

    public getById = async (id: string): Promise<any> => {
        try {
            const result = await commentModels.findById(id).lean();
            return result;
        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    };

    public getByUserId = async (id: string): Promise<any> => {
        try {
            const result = await commentModels.find({userId: id}).lean();
            return result;
        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    };

    public getNumberOfCommentByDesignId = async (id: string): Promise<any> => {
        try {
            let result = await commentModels.find({targetId: id}).lean();
            return result.length;
        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    };

    public getByDesignId = async (id: string): Promise<any> => {
        try {
            let result = await commentModels.find({targetId: id}).lean();
            const originComments = result.filter(item => !item.reply)
            const replyComments = result.filter(item => item.reply)
            const finalResult: ICommentResponse[] = originComments.map(item => {
                const replies = replyComments.filter(reply => reply.reply?.toString() === item._id.toString())
                return {
                    ...item,
                    numberOfReplies: replies.length
                }
            })
            return finalResult;
        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    };

    public getByCommentId = async (commentId: string, targetId: string): Promise<any> => {
        try {
            let result = await commentModels.find({targetId: targetId}).lean();

            let replies = result.filter(item => item.reply?.toString() === commentId.toString())

            const finalResult: ICommentResponse[] = replies.map(item => {
                const replies = result.filter(reply => reply.reply?.toString() === item._id.toString())
                return {
                    ...item,
                    numberOfReplies: replies.length
                }
            })
            return finalResult;
        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    };

    public likeOrDislikeComment = async (commentId: string, userId: string, type: Like_Dislike): Promise<any> => {
        try {
            const comment = await this.getById(commentId)

            if (!comment) {
                throw new Error(FailMessages.NOT_FOUND_COMMENT)
            }

            if (type === Like_Dislike.LIKE) {
                if (comment.like.filter((item: string) => item.toString() === userId.toString())[0]) {
                    comment.like = comment.like.filter((item: string) => item.toString() !== userId.toString())
                } else {
                    comment.dislike = comment.dislike.filter((item: string) => item.toString() !== userId.toString())
                    comment.like = [...comment.like, userId]
                }
            } else if (type === Like_Dislike.DISLIKE) {
                if (comment.dislike.filter((item: string) => item.toString() === userId.toString())[0]) {
                    comment.dislike = comment.dislike.filter((item: string) => item.toString() !== userId.toString())
                } else {
                    comment.like = comment.like.filter((item: string) => item.toString() !== userId.toString())
                    comment.dislike = [...comment.dislike, userId]
                }
            }

            const commentUpdated = await this.update(commentId, comment)

            return commentUpdated;
        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    }

    public getAll = async (): Promise<any> => {
        try {
            const result = await commentModels.find().lean();

            return result;
        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    };
}