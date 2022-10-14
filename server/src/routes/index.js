import { Router } from 'express';
import auth from '../middlewares/auth';
import authRoutes from './auth_route';
import vaccineRoutes from './vaccine_route';

const router = Router();

router.use('/api/auth', authRoutes);
router.use('/api/vaccines', auth, vaccineRoutes);

module.exports = router;
