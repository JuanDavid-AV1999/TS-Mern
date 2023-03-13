import { Request } from "express";

export interface connectionParams {
    host: string;
    user: string;
    password: string;
    database: string;
}

export interface IAuth {
    email: string;
    pass?: string;
}

export interface IUser extends IAuth {
    user_id?: number;
    name: string;
    last_name: string;
    rol: string | number
}

export interface AppRequets extends Request {
    user?: IUser
}
