import { FailMessages } from "../helpers/enums/messages.enum";
import { UserService } from "./user.service";
import notificationModels, { INotification } from "../models/notificationModels";

export class NotificationService {

    private userService!: UserService

    public create = async (data: INotification): Promise<INotification> => {
        try {
            this.userService = new UserService()

            const {userId} = data
            
            const existUser = await this.userService.getById(userId)

            if(!existUser) {
                throw new Error(FailMessages.NOT_FOUND_USER)
            } 

            const result = await notificationModels.create(data)

            return result;
        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    };

    public update = async (id: string, data: any): Promise<any> => {
        try {
            const exist = await notificationModels.findById(id);

            if (!exist) {
                throw new Error(FailMessages.NOT_FOUND_USER_ACTIVITY)
            }

            const result = await notificationModels.findByIdAndUpdate(id, data, { new: true, runValidators: true });

            return result;
        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    };

    public updateReadForManyNotification = async (id: string): Promise<any> => {
        try {
            const exist = await notificationModels.updateMany({userId: id}, {read: true})

            return exist.modifiedCount > 0;
        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    };

    public getByUserId = async (id: string): Promise<any> => {
        try {
            const result = await notificationModels.find({userId: id}).lean();

            return result;
        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    };
}