import express from 'express';
import cors from 'cors';

import routes from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js';

const app = express();

// ============================================
// CORS (CLEAN + RELIABLE)
// ============================================

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (Postman, mobile apps)
    if (!origin) return callback(null, true);

    // Allow localhost (development)
    if (origin.includes('localhost')) {
      return callback(null, true);
    }

    // Allow ANY Vercel deployment (important)
    if (origin.includes('.vercel.app')) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
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