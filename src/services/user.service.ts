import userModels, { IUser } from "../models/userModels"
import { CreateUserInterface, UserInterface, UserUpdateInterface } from '../helpers/commons/interfaces/user.interface';
import { HashPassword } from "../helpers/utils/bcrypt.util";
import { TypeAccounts } from "../helpers/commons/enums/users.enum";
export class UserService {

    public create = async (data: CreateUserInterface): Promise<IUser> => {
        try {

            const userFound = await userModels.findOne({email : data.username})

            if (userFound) {
                throw new Error('COMMON.MESSAGE.FAIL.USER_FOUND')
            }

            let hashedPassword = '';
            if (data.typeAccount === TypeAccounts.NORMAL) {
                hashedPassword = await HashPassword.hash(data.password);
            }
            
            const user = new userModels({
                email: data.username,
                auth: {
                    ...data,
                    password: hashedPassword,
                },
            });
            const result = await user.save();
            return result;
        } catch (error) {
            throw error instanceof Error ? error : new Error('COMMON.MESSAGE.FAIL.COMMON_FAIL');
        }
        
    }

    public update = async (id: string, data: any): Promise<IUser> => {
        try {
            const exist = await userModels.findById(id);
            if(!exist) {
                throw new Error('COMMON.MESSAGE.FAIL.USER_NOT_FOUND')
            }
            const result = await userModels.findByIdAndUpdate(id, data, { new: true, runValidators: true });
            if (!result) {
                throw new Error('COMMON.MESSAGE.FAIL.UPDATE_FAILED');
            }
            return result;
        } catch (error) {
            throw error instanceof Error ? error : new Error('COMMON.MESSAGE.FAIL.COMMON_FAIL');
        }
    }

    public delete = async (id: string): Promise<boolean> => {
        try {
            const exist = await userModels.findById(id);
            if(!exist) {
                throw new Error('COMMON.MESSAGE.FAIL.USER_NOT_FOUND')
            }
            const result = await userModels.findByIdAndDelete(id);
            if(!result) {
                throw new Error('COMMON.MESSAGE.FAIL.COMMON_FAIL')
            }
            return true;
        } catch (error) {
            throw error instanceof Error ? error : new Error('COMMON.MESSAGE.FAIL.COMMON_FAIL');
        }
    }

    public getAll = async (): Promise<IUser[]> => {
        try {
            const result = await userModels.find();
            return result;
        } catch (error) {
            throw error instanceof Error ? error : new Error('COMMON.MESSAGE.FAIL.COMMON_FAIL');
        }
    }

    public getById = async (id: string): Promise<IUser> => {
        try {
            const result = await userModels.findById(id);
            if(!result) {
                throw new Error('COMMON.MESSAGE.FAIL.USER_NOT_FOUND')
            }
            return result;
        } catch (error) {
            throw error instanceof Error ? error : new Error('COMMON.MESSAGE.FAIL.COMMON_FAIL');
        }
    }
}