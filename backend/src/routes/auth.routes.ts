import { Router } from 'express';
import { getUsers, createUser, updateUser } from '../controllers/userController';
import Middlewares from '../middlewares/Middlewares';

const router = Router();
const middlewares = new Middlewares();

router.get('/users', middlewares.requireAuth, getUsers);
router.post('/create-user', middlewares.requireAuth, middlewares.isAllowed, createUser);
router.put('/update-user', middlewares.requireAuth, middlewares.isAllowed, updateUser);

export default router;
