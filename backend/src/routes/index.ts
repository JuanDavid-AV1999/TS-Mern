import { readdirSync } from 'fs';
import { Router } from 'express';
import { Helpers } from '../helpers/Helpers';

const router = Router();
const PATH_NAME: string = __dirname;

readdirSync(PATH_NAME).filter(async (file) => {
    const fileName: string = Helpers.cleanFileName(file);
    if (!fileName.includes('index')) {
        const route = await import(`./${fileName}`);
        router.use(route.default);
    }
});

export default router;
