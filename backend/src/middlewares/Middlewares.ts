import {
    NextFunction,
    Request,
    Response,
    ErrorRequestHandler,
} from 'express';
import { Helpers } from '../helpers/Helpers';
import { AppRequets, IUser } from '../interfaces/app';

class Middlewares {
    public notFound(req: Request, res: Response, _: NextFunction): void {
        const { method, url } = req;
        res.status(404).json({ code: 404, stack: `${url} - ${method} not found.` });
    }

    public serverInternaError(
        err: ErrorRequestHandler,
        _: Request,
        res: Response,
        next: NextFunction
    ): void {
        if (!err) return next();
        res.status(500).json({ code: 200, stack: 'Server DIE x_x.' });
    }

    public requireAuth(
        req: AppRequets,
        res: Response,
        next: NextFunction
    ): void | Response {
        const { authorization } = req.headers;
        const data: IUser | undefined = Helpers.extractTokenData(authorization!);

        if (data === undefined) {
            return res.status(401).json({ code: 401, stack: 'unauthorized' });
        }

        req.user = data;
        next();
    }

    public isAllowed(
        req: AppRequets,
        res: Response,
        next: NextFunction
    ): void | Response {
        if (req.user?.rol !== 'ADMIN') {
            return res.status(403).json({ code: 403, stack: 'permission denied' });
        }

        next();
    }
}

export default Middlewares;
