import mongoose, { Schema, Document } from "mongoose";
import moment from "moment-timezone";
moment.tz.setDefault("Asia/Ho_Chi_Minh");

export interface INotification {
  image: string;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
  navigate?: string;
  read?: boolean;
  userId: string;
}

const NotificationSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },

    image: { type: String, required: true },

    title: { type: String, required: true },

    content: { type: String, required: true },

    navigate: { type: String, default: '' },

    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<INotification>("notifications", NotificationSchema);