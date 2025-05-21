import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import v1Routes from './routes/v1/index.js';
// import logger from './utils/logger';
import { ErrorRequestHandler } from 'express';
import logger from './utils/logger.js';

const app = express();

// Middlewares
app.use((helmet as any)());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  morgan('combined', {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

// API Routes
app.use(v1Routes);

// 404 Handler
app.use((req, res) => {
  logger.error(`404 Not Found: ${req.method} ${req.path}`);
  res.status(404).json({
    status: 'error',
    message: 'Not Found',
  });
});

// Error Handler
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  logger.error(`Error: ${err.message}`);
  res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
};
app.use(errorHandler);

export default app;