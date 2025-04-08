import { ProcessSignups } from './../helpers/enums/users.enum';
import userModels, { IUser } from "../models/userModels"
import { CreateUserInterface } from '../helpers/interfaces/user.interface';
import { HashPassword } from "../helpers/utils/bcrypt.util";
import { TypeAccounts } from "../helpers/enums/users.enum";
import { FailMessages } from "../helpers/enums/messages.enum";
import { generateUniqueUserSlug } from "../helpers/utils/common.util";
export class UserService {

    public create = async (data: CreateUserInterface): Promise<IUser> => {
        try {

            const userFound = await userModels.findOne({email : data.username})

            if (userFound) {
                throw new Error(FailMessages.FOUND_USER)
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

            const result = await user.save()

            return result;

        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    }

    public update = async ({id, data}: {id: string, data: any}): Promise<IUser> => {
        try {
            const exist = await userModels.findById(id);

            if(!exist) {
                throw new Error(FailMessages.NOT_FOUND_USER)
            }

            if (data.fullName !== exist.fullName) {
                data.auth.slug = await generateUniqueUserSlug(data.fullName, userModels)
            }

            const result = await userModels.findByIdAndUpdate(id, data, { new: true, runValidators: true });
            if (!result) {
                throw new Error(FailMessages.UPDATE_FAIL);
            }
            return result;
        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    }

    public delete = async (id: string): Promise<boolean> => {
        try {
            const exist = await userModels.findById(id);
            if(!exist) {
                throw new Error(FailMessages.NOT_FOUND_USER)
            }

            exist.auth.isDeleted.timestamp = new Date().toISOString()

            exist.auth.isDeleted.value = true;

            const result = await userModels.findByIdAndUpdate(id, exist);
            if(!result) {
                throw new Error(FailMessages.COMMON)
            }
            return true;
        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    }

    public getAll = async (hiddenPassword? : boolean): Promise<IUser[]> => {
        try {
            let result = await userModels.find().lean();

            result = result.filter(user => user.auth.processSignup === ProcessSignups.STEP3 && user.majors.length > 0)

            if (hiddenPassword) {
                result = result.map(item => {
                    item.auth.password = ''
                    return item
                })
            }

            return result;
            
        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    }

    public getById = async (id: string, hiddenPassword? : boolean): Promise<IUser> => {
        try {
            const result = await userModels.findById(id).lean();

            if(!result) {
                throw new Error(FailMessages.NOT_FOUND_USER)
            }

            if (hiddenPassword) {
                result.auth.password = ''
            }

            return result;
        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    }

    public getByUsername = async (username: string, hiddenPassword? : boolean): Promise<IUser> => {
        try {
            const result = await userModels.findOne({'auth.username': username}).lean();

            if(!result) {
                throw new Error(FailMessages.NOT_FOUND_USER)
            }

            if (hiddenPassword) {
                result.auth.password = ''
            }

            return result;

        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    }

    public getByEmail = async (email: string, hiddenPassword? : boolean): Promise<IUser> => {
        try {
            const result = await userModels.findOne({'email': email}).lean();

            if(!result) {
                throw new Error(FailMessages.NOT_FOUND_USER)
            }

            if (hiddenPassword) {
                result.auth.password = ''
            }

            return result;

        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    }


}