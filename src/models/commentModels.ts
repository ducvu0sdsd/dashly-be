import mongoose, { Schema, Document } from "mongoose";
import moment from "moment-timezone";
moment.tz.setDefault("Asia/Ho_Chi_Minh");

export interface IComment extends Document {
  author: {
    _id: string,
    fullName: string,
    avatar: string,
  },
  targetId: string;
  images: string[];
  content: string;
  like: string[];
  dislike: string[];
  reply: string | null;
}

export interface ICommentResponse {
  author: {
    _id: string,
    fullName: string,
    avatar: string,
  },
  targetId: string;
  images: string[];
  content: string;
  like: string[];
  dislike: string[];
  numberOfReplies: number;
}

const CommentSchema: Schema = new Schema(
  {
    author: {
      _id: { type: Schema.Types.ObjectId, required: true, ref: "User" },
      fullName: { type: String, required: true},
      avatar: { type: String, required: true},
    },
    targetId: { type: Schema.Types.ObjectId, required: true, ref: "Target" },
    images: { type: [String] },
    content: { type: String, required: true },
    like: { type: [Schema.Types.ObjectId], default: [], ref: "User" },
    dislike: { type: [Schema.Types.ObjectId], default: [], ref: "User" },
    reply: { type: Schema.Types.ObjectId, ref: "Comment", default: null }
  },
  { timestamps: true }
);

export default mongoose.model<IComment>("comment", CommentSchema);