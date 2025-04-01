export interface DesignInterface {
    _id?: string;
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
    createdAt: string;
    updatedAt: string;
    content: string;
}
export interface CreateDesignInterface {
    name: string;
    images: string[];
    mainImage: string;
    user: {
        _id: string;
        fullName: string;
        avatar: string;
    };
    content: string;
}