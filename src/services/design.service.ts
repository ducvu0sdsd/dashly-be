import designModels from "../models/designModels";
import { CreateDesignInterface } from "../helpers/interfaces/design.interface";
import userModels from "../models/userModels";
import { FailMessages } from "../helpers/enums/messages.enum";
import { UserActivityService } from "./user-activity.service";
import { IUserActivity } from "../models/userActivityModels";
import { TypeActions } from "../helpers/enums/user-activity.enum";
import { createSlug } from "../helpers/utils/common.util";
export class DesignService {

    private userActivityService!: UserActivityService

    public create = async (data: CreateDesignInterface): Promise<any> => {
        try {
            const existUser = await userModels.findById(data.user._id);

            if(!existUser) {
                throw new Error(FailMessages.NOT_FOUND_USER)
            }   

            const design = new designModels({...data, slug: createSlug(data.name)});

            const result = await design.save();

            return result;
        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    };

    public update = async (id: string, data: any): Promise<any> => {
        try {
            const exist = await designModels.findById(id);

            if (!exist) {
                throw new Error(FailMessages.NOT_FOUND_DESIGN)
            }
            const result = await designModels.findByIdAndUpdate(id, data, { new: true, runValidators: true });

            return result;
        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    };

    public delete = async (id: string): Promise<any> => {
        try {
            const exist = await designModels.findById(id);

            if (!exist) {
                throw new Error(FailMessages.NOT_FOUND_DESIGN)
            }

            const result = await designModels.findByIdAndDelete(id);

            if (!result) {
                throw new Error(FailMessages.DELETE_DESIGN)
            }
            return true;
        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    };

    public getAll = async (): Promise<any> => {
        try {
            const result = await designModels.find();

            return result;
        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    };

    public getById = async (id: string): Promise<any> => {
        try {
            const result = await designModels.findById(id);

            if(!result) {
                throw new Error(FailMessages.NOT_FOUND_DESIGN)
            }
            return result;
        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    };

    public getBySlug = async (slug: string): Promise<any> => {
        try {
            const result = await designModels.findOne({slug});

            if(!result) {
                throw new Error(FailMessages.NOT_FOUND_DESIGN)
            }
            return result;
        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    };

    public getByUserId = async (userid: string): Promise<any> => {
        try {
            this.userActivityService = new UserActivityService()

            const exist = await userModels.findById(userid);

            if(!exist) {
                throw new Error(FailMessages.NOT_FOUND_USER)
            }

            let result = await designModels.find({'user._id': userid }).lean();

            const activities = await this.userActivityService.getAll()
            
            result = result.map(item => {
                const likes = activities.filter((act: IUserActivity) => act.targetId === item._id && act.actionType === TypeActions.LIKE)
                const rates = activities.filter((act: IUserActivity) => act.targetId === item._id && act.actionType === TypeActions.RATE)
                const ratePercent = rates.length === 0 ? -1 : rates.reduce((total: number, item: any) => total += item.rating ,0) / rates.length
                return {...item, like: likes.length, rating: ratePercent}
            })

            return result;
            
        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    };
}