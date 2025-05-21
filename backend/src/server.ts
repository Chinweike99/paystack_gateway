// import app from './app.js';
// import config from './config/index.js';
// // import logger from './utils/logger';

// const server = app.listen(config.port, () => {
//   console.log(`Server running on port ${config.port}`);
// });

// process.on('unhandledRejection', (err: Error) => {
//   console.log(`Unhandled Rejection: ${err.message}`);
//   server.close(() => process.exit(1));
// });

// process.on('SIGTERM', () => {
//   console.log('SIGTERM received. Shutting down gracefully');
//   server.close(() => {
//     console.log('Process terminated');
//   });
// });



// server.ts - Debug version
import express from 'express';

console.log('✓ Express imported successfully');

// Test each import individually
let app: express.Application;
let config: any;

try {
  console.log('Importing config...');
  config = await import('./config/index.js');
  console.log('✓ Config imported successfully');
} catch (error) {
  console.error('✗ Error importing config:', error);
  process.exit(1);
}

try {
  console.log('Importing app...');
  const appModule = await import('./app.js');
  app = appModule.default;
  console.log('✓ App imported successfully');
} catch (error) {
  console.error('✗ Error importing app:', error);
  process.exit(1);
}

try {
  console.log('Starting server...');
  const server = app.listen(config.default?.port || config.port || 3000, () => {
    console.log(`✓ Server running on port ${config.default?.port || config.port || 3000}`);
  });

  process.on('unhandledRejection', (err: Error) => {
    console.log(`Unhandled Rejection: ${err.message}`);
    server.close(() => process.exit(1));
  });

  process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully');
    server.close(() => {
      console.log('Process terminated');
    });
  });
} catch (error) {
  console.error('✗ Error starting server:', error);
  process.exit(1);
}