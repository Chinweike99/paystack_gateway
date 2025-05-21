import { Router } from 'express';
import paymentRoutes from './payment.route.js';

const router = Router();

router.use('/api/v1', paymentRoutes);

export default router;