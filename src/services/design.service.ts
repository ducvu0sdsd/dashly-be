import { NotificationService } from './notification.service';
import designModels from "../models/designModels";
import { CreateDesignInterface, OptionInterface } from "../helpers/interfaces/design.interface";
import userModels from "../models/userModels";
import { FailMessages } from "../helpers/enums/messages.enum";
import { UserActivityService } from "./user-activity.service";
import { IUserActivity } from "../models/userActivityModels";
import { TypeActions } from "../helpers/enums/user-activity.enum";
import { createSlug } from "../helpers/utils/common.util";
import { TimeFilter } from "../helpers/enums/design.enum";
import { startOfWeek, subWeeks, startOfYear } from 'date-fns';
import { INotification } from '../models/notificationModels';
export class DesignService {

    private userActivityService!: UserActivityService

    private notificationService!: NotificationService

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
            this.userActivityService = new UserActivityService()

            const result = await designModels.findByIdAndDelete(id);

            await this.userActivityService.deleteByDesignId(id)

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
            this.userActivityService = new UserActivityService()

            let result = await designModels.find().lean();
            
            const activities = await this.userActivityService.getAll()

            result = result.map(item => {
                const likes = activities.filter((act: IUserActivity) => act.targetId.toString() === item._id.toString() && act.actionType === TypeActions.LIKE)
                const rates = activities.filter((act: IUserActivity) => act.targetId.toString() === item._id.toString() && act.actionType === TypeActions.RATE)
                const ratePercent = rates.length === 0 ? -1 : rates.reduce((total: number, item: any) => total += item.rating ,0) / rates.length
                return {...item, like: likes.length, rating: ratePercent, likes}
            })

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

    public getByDesignTypeAndCreatedAtAndName = async (designType: string, createAt: string, name: string): Promise<any[]> => {
        try {
            this.userActivityService = new UserActivityService()

            const options: Record<string, string> = {
                [TimeFilter.Now]: new Date().toISOString(),
    
                [TimeFilter.ThisWeek]: startOfWeek(new Date(), { weekStartsOn: 1 }).toISOString(),
    
                [TimeFilter.ThisPastWeek]: startOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 }).toISOString(),
    
                [TimeFilter.ThisYear]: startOfYear(new Date()).toISOString(),
    
                [TimeFilter.AllTime]: new Date(0).toISOString(), // 1970-01-01T00:00:00.000Z
            };
    
            const fromDate = options[createAt];

            let result = await designModels.find({
                ...(createAt !== 'none' && {
                    createdAt: { $gte: new Date(fromDate) }
                }),
                ...(name !== 'none' && {
                    $or: [
                        { name: { $regex: name, $options: 'i' } },
                        { 'user.fullName': { $regex: name, $options: 'i' } },
                        { content: { $regex: name, $options: 'i' } }
                    ],
                }),
                designType,
                verification: true
            }).lean();

            const activities = await this.userActivityService.getAll()

            result = result.map(item => {
                const likes = activities.filter((act: IUserActivity) => act.targetId.toString() === item._id.toString() && act.actionType === TypeActions.LIKE)
                const rates = activities.filter((act: IUserActivity) => act.targetId.toString() === item._id.toString() && act.actionType === TypeActions.RATE)
                const ratePercent = rates.length === 0 ? -1 : rates.reduce((total: number, item: any) => total += item.rating ,0) / rates.length
                return {...item, like: likes.length, rating: ratePercent, likes}
            })

            return result;
        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    };

    public getByCreatedAtAndName = async (createAt: string, name: string): Promise<any[]> => {
        try {
            this.userActivityService = new UserActivityService()

            const options: Record<string, string> = {
                [TimeFilter.Now]: new Date().toISOString(),
    
                [TimeFilter.ThisWeek]: startOfWeek(new Date(), { weekStartsOn: 1 }).toISOString(),
    
                [TimeFilter.ThisPastWeek]: startOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 }).toISOString(),
    
                [TimeFilter.ThisYear]: startOfYear(new Date()).toISOString(),
    
                [TimeFilter.AllTime]: new Date(0).toISOString(), // 1970-01-01T00:00:00.000Z
            };
    
            const fromDate = options[createAt];
    
            let result = await designModels.find({
                ...(createAt !== 'none' && {
                    createdAt: { $gte: new Date(fromDate) }
                }),
                ...(name !== 'none' && {
                    $or: [
                        { name: { $regex: name, $options: 'i' } },
                        { 'user.fullName': { $regex: name, $options: 'i' } },
                        { content: { $regex: name, $options: 'i' } }
                    ],
                }),
                verification: true
            }).lean();

            const activities = await this.userActivityService.getAll()

            result = result.map(item => {
                const likes = activities.filter((act: IUserActivity) => act.targetId.toString() === item._id.toString() && act.actionType === TypeActions.LIKE)
                const rates = activities.filter((act: IUserActivity) => act.targetId.toString() === item._id.toString() && act.actionType === TypeActions.RATE)
                const ratePercent = rates.length === 0 ? -1 : rates.reduce((total: number, item: any) => total += item.rating ,0) / rates.length
                return {...item, like: likes.length, rating: ratePercent, likes}
            })

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

            const activities = await this.userActivityService.getByAuthorId(userid)
            
            result = result.map(item => {
                const likes = activities.filter((act: IUserActivity) => act.targetId.toString() === item._id.toString() && act.actionType === TypeActions.LIKE)
                const rates = activities.filter((act: IUserActivity) => act.targetId.toString() === item._id.toString() && act.actionType === TypeActions.RATE)
                const ratePercent = rates.length === 0 ? -1 : rates.reduce((total: number, item: any) => total += item.rating ,0) / rates.length
                return {...item, like: likes.length, rating: ratePercent}
            })

            return result;
            
        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    };

    public aprroveVerification = async (id: string, data: any): Promise<any> => {
        try {
            this.notificationService = new NotificationService()

            const exist = await designModels.findById(id);

            if (!exist) {
                throw new Error(FailMessages.NOT_FOUND_DESIGN)
            }

            const result = await designModels.findByIdAndUpdate(id, data, { new: true, runValidators: true });

            const newNotification: INotification = {
                image: '/admin.jpg',
                title: 'ADMIN_HAS_APPROVE_YOUR_DESIGN',
                content: exist.name,
                userId: exist.user._id
            };

            await this.notificationService.create(newNotification)

            return result;
        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    };

}