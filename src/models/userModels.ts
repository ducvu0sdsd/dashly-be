import mongoose, { Schema, Document } from "mongoose";
import moment from "moment-timezone";
import { Genders, ProcessSignups, Roles, TypeAccounts } from "../helpers/commons/enums/users-enum";
moment.tz.setDefault("Asia/Ho_Chi_Minh");
export interface IUser extends Document {
    fullName: string;
    dob: string;
    avatar: string;
    phoneNumber: string;
    address: string;
    email: string;
    bio: string;
    gender: Genders;
    socialLinks: string[];
    deleted: boolean;
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

const UserSchema: Schema = new Schema(
  {
    fullName: { type: String, default: "" },
    dob: { type: String, default: new Date().toISOString() },
    avatar: { type: String, default: "https://th.bing.com/th/id/R.be953f29410b3d18ef0e5e0fbd8d3120?rik=Dm2iDRVLgVcpdA&pid=ImgRaw&r=0" },
    phoneNumber: { type: String, default: "" },
    address: { type: String, default: "" },
    email: { type: String, default: "" },
    bio: { type: String, default: "" },
    gender: { type: String, default: Genders.OTHER },
    socialLinks: { type: [String], default: [] },
    deleted: { type: Boolean, default: false },
    auth: {
      username: { type: String, default: "" },
      password: { type: String, default: "" },
      emailVerify: { type: Boolean, default: false },
      passwordsUserd: { type: [String], default: [] },
      lastLogin: { type: String, default: new Date().toISOString() },
      role: { type: String,  default: Roles.USER },
      isActive: { type: Boolean, default: false },
      processSignup: { type: String, default: ProcessSignups.STEP1 }, 
      typeAccount: { type: String, default: TypeAccounts.NORMAL },
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("users", UserSchema);