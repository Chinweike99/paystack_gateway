import dotenv from 'dotenv'

dotenv.config();
export default {
    port: process.env.PORT || 5000,
    paystack: {
        secretKey: process.env.PAYSTACK_SECRET_KEY,
        baseURL: process.env.PAYSTACK_BASE_URL
    },
    rateLimit: {
        windowMs: process.env.RATE_LIMIT_WINDOW_MS
        ? parseInt(process.env.RATE_LIMIT_WINDOW_MS)
        : 15 * 60 * 1000,
    max: process.env.RATE_LIMIT_MAX ? parseInt(process.env.RATE_LIMIT_MAX) : 100
    }
};