import userModels from "../models/userModels"
import { CreateUserInterface, UserInterface, UserUpdateInterface } from '../helpers/commons/interfaces/user-interface';
import { HashPassword } from '../helpers/untils/bcryptUntil';
export class UserService {

    public create = async (data: CreateUserInterface): Promise<any> => {
        try {
            const hashedPassword = await HashPassword.hash(data.password);
            const user = new userModels({
                ...data,
                auth: {
                    ...data,
                    password: hashedPassword,
                },
            });     
            const result = await user.save();
            return result;
        } catch (error) {
            return error;
        }
        
    }

    public update = async (id: string, data: any): Promise<any> => {
        try {
            const exist = await userModels.findById(id);
            if(!exist) {
                return 0;
            }
            const result = await userModels.findByIdAndUpdate(id, data, { new: true, runValidators: true });
            return result;
        } catch (error) {
            return error;
        }
        
    }

    public delete = async (id: string): Promise<any> => {
        try {
            const exist = await userModels.findById(id);
            if(!exist) {
                return 0;
            }
            const result = await userModels.findByIdAndUpdate(id, { deleted: true }, { new: true, runValidators: true });
            if(!result) {
                return false;
            }
            return true;
        } catch (error) {
            return error;
        }
    }

    public getAll = async (): Promise<any> => {
        try {
            const result = await userModels.find();
            return result;
        } catch (error) {
            return error;
        }
    }

    public getById = async (id: string): Promise<any> => {
        try {
            const result = await userModels.findById(id);
            if(!result) {
                return 0;
            }
            return result;
        } catch (error) {
            return error;
        }
    }
}