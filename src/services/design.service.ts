import designModels from "../models/designModels";
import { CreateDesignInterface } from "../helpers/interfaces/design.interface";
import userModels from "../models/userModels";
import { FailMessages } from "../helpers/enums/messages.enum";
export class DesignService {

    public create = async (data: CreateDesignInterface): Promise<any> => {
        try {
            const existUser = await userModels.findById(data.user._id);

            if(!existUser) {
                throw new Error(FailMessages.NOT_FOUND_USER)
            }   
            const design = new designModels(data);

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

    public getByUserId = async (userid: string): Promise<any> => {
        try {
            const exist = await userModels.findById(userid);

            if(!exist) {
                throw new Error(FailMessages.NOT_FOUND_USER)
            }

            const result = await designModels.find({ 'user._id': userid });
            
            return result;
        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    };
}