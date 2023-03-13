import { Request, Response } from 'express';
import { Helpers } from '../helpers/Helpers';
import { get } from '../models/UserModel';
import { IUser } from '../interfaces/app';

export const authentication = async ({ body }: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = body;
        const user: IUser = await get({
            email,
            pass: Helpers.base64(password),
        });
        if (!user) throw new Error('Does not exist user');

        const token: string = Helpers.generateUserToken({
            user_id: user.user_id,
            name: user.name,
            last_name: user.last_name,
            email: user.email,
            rol: user.rol
        });

        res.setHeader('Authentication', token);
        res.status(200).json({ code: 200, stack: 'success', payload: token });
    } catch (err) {
        res.status(403).send({
            code: 403,
            stack: 'auth failed email or password incorrect',
        });
    }
};
