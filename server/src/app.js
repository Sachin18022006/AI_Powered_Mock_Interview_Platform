import express from 'express';
import cors from 'cors';

import routes from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js';

const app = express();

// ============================================
// CORS FIX (IMPORTANT)
// ============================================

const allowedOrigins = [
  'http://localhost:5173', // local dev
  'https://ai-powered-mock-interview-platform-rosy.vercel.app' // your Vercel URL
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// ============================================
// BODY PARSER
// ============================================

app.use(express.json({ limit: '10mb' }));

// ============================================
// ROUTES
// ============================================

app.use('/api', routes);

// ============================================
// ERROR HANDLING
// ============================================

app.use(notFoundHandler);
app.use(errorHandler);

export default app;