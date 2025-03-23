import mongoose, { Schema, Document } from "mongoose";

export interface IDesign extends Document {
    name: string;
    images: string[];
    mainImage: string;
    user: {
        _id: string;
        fullName: string;
        avatar: string;
    };
    like: number;
    view: number;
    description: string;
    createdAt: string;
    updatedAt: string;
    content: string;
}

const DesignSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        images: { type: [String], required: true },
        mainImage: { type: String, required: true },
        user: {
            _id: { type: String, required: true },
            fullName: { type: String, required: true },
            avatar: { type: String, required: true },
        },
        like: { type: Number, default: 0 },
        view: { type: Number, default: 0 },
        description: { type: String, required: true },
        content: { type: String, required: true },
    },
    { timestamps: true } 
);

export default mongoose.model<IDesign>("Design", DesignSchema);