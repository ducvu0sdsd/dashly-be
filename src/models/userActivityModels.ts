import mongoose, { Schema, Document } from "mongoose";
import moment from "moment-timezone";
import { TypeActions } from "../helpers/enums/user-activity.enum";
moment.tz.setDefault("Asia/Ho_Chi_Minh");

export interface IUserActivity extends Document {
    userId: string;
    targetId: string;
    authorId: string;
    actionType: TypeActions;
    createdAt?: string;
    updatedAt?: string;
    rating?: number;
}

const UserActivitySchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },

    targetId: { type: Schema.Types.ObjectId,required: true },

    authorId: { type: Schema.Types.ObjectId,required: true },

    actionType: { type: String, enum: ['like', 'rate'], required: true },

    rating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IUserActivity>("userActivities", UserActivitySchema);