import { IUser } from '../interfaces/app';
import { NextFunction, Request, Response } from 'express';
import { create, getAll, update } from '../models/UserModel';
import { Helpers } from '../helpers/Helpers';

export const getUsers = async (
    _: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const users: Array<IUser> = await getAll();
        res.status(200).json({ code: 200, stack: 'success', payload: users });
    } catch (err) {
        next(err);
    }
};

export const createUser = async (
    { body }: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { name, last_name, email, password, rol } = body;
        const wasCreated: boolean = await create({
            name,
            last_name,
            email,
            pass: Helpers.base64(password),
            rol,
        });
        if (!wasCreated) throw new Error();
        res.status(200).json({ code: 200, stack: 'user created success' });
    } catch (err) {
        next(err);
    }
};

export const updateUser = async (
    { body }: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const wasUpdated: boolean = await update(body);
        if (!wasUpdated) throw new Error();
        res.status(200).json({ code: 200, stack: 'user updated success' });
    } catch (err) {
        next(err);
    }
};
