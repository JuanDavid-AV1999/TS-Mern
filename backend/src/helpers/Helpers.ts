import { verify, sign } from 'jsonwebtoken';
import { SECRET_TOKEN } from '../config/constants';
import { IUser } from '../interfaces/app';

export class Helpers {
    public static extractTokenData(authorization: string): IUser | undefined {
        if (!authorization) return undefined;
        const token: string = authorization.split(' ')[1];
        try {
            const userData = verify(token, SECRET_TOKEN) as IUser;
            if (typeof userData !== 'object') return undefined;
            return userData;
        } catch (error) {
            return undefined;
        }
    }

    public static generateUserToken(data: IUser): string {
        return sign(data, SECRET_TOKEN, {
            expiresIn: 60 * 60 * 24,
        });
    }

    public static cleanFileName(fileName: string): string {
        return `${fileName.split('.').shift()}.routes`;
    }

    public static base64(value: string, decode: boolean = false): string {
        if (!decode) return Buffer.from(value).toString('base64');

        return Buffer.from(value, 'base64').toString();
    }
}
