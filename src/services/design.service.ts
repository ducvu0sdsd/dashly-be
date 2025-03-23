import designModels from "../models/designModels";
import { CreateDesignInterface } from "../helpers/commons/interfaces/design.interface";
import userModels from "../models/userModels";
export class DesignService {
    public create = async (data: CreateDesignInterface): Promise<any> => {
        try {
            const existUser = await userModels.findById(data.user._id);
            if(!existUser) {
                return "Not found user";
            }   
            const design = new designModels(data);
            const result = await design.save();
            return result;
        } catch (error) {
            return error;
        }
    };

    public update = async (id: string, data: any): Promise<any> => {
        try {
            const exist = await designModels.findById(id);
            if (!exist) {
                return 0;
            }
            const result = await designModels.findByIdAndUpdate(id, data, { new: true, runValidators: true });
            return result;
        } catch (error) {
            return error;
        }
    };

    public delete = async (id: string): Promise<any> => {
        try {
            const exist = await designModels.findById(id);
            if(!exist) {
                return 0;
            }
            const result = await designModels.findByIdAndUpdate(id, { deleted: true }, { new: true });
            if(!result) {
                return false;
            }
            return true;
        } catch (error) {
            return error;
        }
    };

    public getAll = async (): Promise<any> => {
        try {
            const result = await designModels.find();
            return result;
        } catch (error) {
            return error;
        }
    };

    public getById = async (id: string): Promise<any> => {
        try {
            const result = await designModels.findById(id);
            if(!result) {
                return 0;
            }
            return result;
        } catch (error) {
            return error;
        }
    };

    public getByUserId = async (userid: string): Promise<any> => {
        try {
            const exist = await userModels.findById(userid);
            if(!exist) {
                return "Not found user";
            }
            const result = await designModels.find({ 'user._id': userid });
            return result;
        } catch (error) {
            return error;
        }
    };
}