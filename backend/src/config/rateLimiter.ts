import {RateLimiterMemory} from 'rate-limiter-flexible';
import config from './index.js';
import { NextFunction, Request, Response } from 'express';

const rateLimiter = new RateLimiterMemory({
    points: config.rateLimit.max,
    duration: config.rateLimit.windowMs /1000, //COnverts to seconds
});

export default async(req:Request, res: Response, next: NextFunction) => {
    try {
    await rateLimiter.consume(req.ip || `unknown-ip`);
    next();
  } catch (error) {
    res.status(429).json({
      status: 'error',
      message: 'Too many requests, please try again later',
    });
  }
}