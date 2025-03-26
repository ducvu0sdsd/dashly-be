import { Genders, ProcessSignups, Roles, TypeAccounts } from "../enums/users.enum";
export interface AuthInterface {
    username: string;
    password: string;
    emailVerify: boolean;
    passwordsUserd: string[];
    lastLogin: string;
    role: Roles;
    isActive: boolean;
    processSignup: ProcessSignups;
    typeAccount: TypeAccounts;
}

export interface UserInterface {
    _id?: string;
    fullName: string;
    dob: string;
    avatar: string;
    phoneNumber: string;
    address: string;
    email: string;
    auth: AuthInterface;
    bio: string;
    gender: Genders;
    socialLinks: string[];
    createdAt: string;
    updatedAt: string;
}
export interface UserOfDesignInterface {
    _id: string;
    fullName: string;
    avatar: string;
}
export interface CreateUserInterface {
    username: string;
    password: string;
    typeAccount: TypeAccounts;
}
export interface UserUpdateInterface {
    _id?: string;
    fullName?: string;
    dob?: string;
    avatar?: string;
    phoneNumber?: string;
    address?: string;
    email?: string;
    auth?: AuthUpdateInterface;
    bio?: string;
    gender?: Genders;
    socialLinks?: string[];
}
export interface AuthUpdateInterface {
    username?: string;
    password?: string;
    emailVerify?: boolean;
    passwordsUserd?: string[];
    lastLogin?: string;
    role?: Roles;
    isActive?: boolean;
    processSignup?: ProcessSignups;
    typeAccount?: TypeAccounts;
}

export interface MailQueueInterface {
    email: string;
    otp: string;
    createdAt: string;
}

export interface UserInformationInterface {
    user_id: string;
    fullName: string;
    phoneNumber: string;
    address: string;
    dob: string;
    gender: Genders;
    country: string;
}