import { genSalt, hash, compare } from 'bcryptjs';

export class HashPassword {

    public static async hash(password: string): Promise<string> {
        const salt = await genSalt(10);
        return hash(password, salt);
    }

    public static async compare({password, hashedPassword}: {password: string, hashedPassword: string}): Promise<boolean> {
        return compare(password, hashedPassword);
    }
    
}