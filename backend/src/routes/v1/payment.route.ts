import {Router} from 'express';
import { initaitePaymentHandler, paymentStatusHandler } from '../../controllers/payment.controller.js';
import rateLimiter from '../../config/rateLimiter.js';

const router = Router();

router.post('/payment/initiate', rateLimiter, initaitePaymentHandler);
router.get('/payment/status/:reference', rateLimiter, paymentStatusHandler);

export default router;