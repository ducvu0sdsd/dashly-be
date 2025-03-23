import { TypeAccounts, Genders, Roles, ProcessSignups } from "../../commons/enums/users-enum";
// create
export class CreateUserDto {
    username: string;
    password: string;
    typeAccount: TypeAccounts;
}
export class ResponeCreateUserDto {
    _id?: string;
    fullName: string;
    dob: string;
    avatar: string;
    phoneNumber: string;
    address: string;
    email: string;
    bio: string;
    gender: Genders;
    socialLinks: string[];
    auth: {
        username: string;
        password: string;
        emailVerify: boolean;
        passwordsUserd: string[];
        lastLogin: string;
        role: Roles;
        isActive: boolean;
        processSignup: ProcessSignups;
        typeAccount: TypeAccounts;
    };
    createdAt: string;
    updatedAt: string;
}