import mongoose, { Schema, Document } from "mongoose";
import moment from "moment-timezone";
moment.tz.setDefault("Asia/Ho_Chi_Minh");

export interface IFollowing extends Document {
    follower: string,
    following: string,
    createdAt?: string,
    updatedAt?: string
}

const FollowingSchema = new Schema({
  follower: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  following: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, {
  timestamps: true
});

FollowingSchema.index({ follower: 1, following: 1 }, { unique: true });

export default mongoose.model<IFollowing>("following", FollowingSchema);