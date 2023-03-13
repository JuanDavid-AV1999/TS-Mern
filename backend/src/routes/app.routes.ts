import { Router } from 'express';
import { authentication } from '../controllers/authControllers';

const router = Router();

router.post('/login', authentication);

export default router;
