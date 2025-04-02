import mongoose, { Schema, Document } from "mongoose";

export interface IDesign extends Document {
    name: string;
    images: string[];
    mainImage: string;
    user: {
        _id: string;
        fullName: string;
        avatar: string;
        email: string;
        country: string;
        phoneNumber: string;
    };
    slug: string;
    view: number;
    createdAt: string;
    updatedAt: string;
    content: string;
}

const DesignSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        images: { type: [String], required: true },
        mainImage: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        user: {
            _id: { type: String, required: true },
            fullName: { type: String, required: true },
            avatar: { type: String, required: true },
            email: { type: String, required: true },
            country: { type: String, required: true },
            phoneNumber: { type: String, required: true },
        },
        view: { type: Number, default: 0 },
        content: { type: String, required: true },
    },
    { timestamps: true } 
);

export default mongoose.model<IDesign>("Design", DesignSchema);