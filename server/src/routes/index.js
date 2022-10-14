import { Router } from 'express';
import authRoutes from './auth_route';

const router = Router();

router.use('/api/auth', authRoutes);

module.exports = router;
