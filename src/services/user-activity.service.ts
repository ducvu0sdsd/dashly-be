import { FailMessages } from "../helpers/enums/messages.enum";
import userActivityModels, { IUserActivity } from "../models/userActivityModels";
import { UserService } from "./user.service";
import { DesignService } from "./design.service";

export class UserActivityService {

    private userService!: UserService

    private designService!: DesignService

    public create = async (data: IUserActivity): Promise<IUserActivity> => {
        try {
            this.userService = new UserService()

            this.designService = new DesignService()

            const {userId, targetId, actionType, rating} = data
            
            const existUser = await this.userService.getById(userId)

            if(!existUser) {
                throw new Error(FailMessages.NOT_FOUND_USER)
            } 

            const existDesign = await this.designService.getById(targetId)

            if(!existDesign) {
                throw new Error(FailMessages.NOT_FOUND_DESIGN)
            } 

            const result = await userActivityModels.create({userId, targetId, actionType, rating})

            return result;
        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    };

    public update = async (id: string, data: any): Promise<any> => {
        try {
            const exist = await userActivityModels.findById(id);

            if (!exist) {
                throw new Error(FailMessages.NOT_FOUND_USER_ACTIVITY)
            }

            const result = await userActivityModels.findByIdAndUpdate(id, data, { new: true, runValidators: true });

            return result;
        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    };

    public delete = async (id: string): Promise<any> => {
        try {
            const exist = await userActivityModels.findById(id);

            if (!exist) {
                throw new Error(FailMessages.NOT_FOUND_USER_ACTIVITY)
            }

            const result = await userActivityModels.findByIdAndDelete(id);

            if (!result) {
                throw new Error(FailMessages.DELETE_DESIGN)
            }
            return true;
        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    };

    public getByUserId = async (id: string): Promise<any> => {
        try {
            const result = await userActivityModels.find({userId: id}).lean();

            return result;
        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    };

    public getByDesignId = async (id: string): Promise<any> => {
        try {
            const result = await userActivityModels.find({targetId: id}).lean();

            return result;
        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    };

    public getAll = async (): Promise<any> => {
        try {
            const result = await userActivityModels.find().lean();

            return result;
        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    };
}