export interface DesignInterface {
    _id?: string;
    name: string;
    images: string[];
    mainImage: string;
    user: {
        _id: string;
        fullName: string;
        avatar: string;
        email: string;
        country: string;
        phoneNumber: string
    };
    slug: string;
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
        email: string;
        country: string;
        phoneNumber: string;
    };
    content: string;
}