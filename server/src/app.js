import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import routes from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.resolve(__dirname, '../../client/dist');

const app = express();

// ============================================
// CORS (FLEXIBLE + SECURE)
// ============================================

const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5000',
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (Postman, mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);

    // Explicitly allowed origins
    if (allowedOrigins.some(o => origin.startsWith(o) || o.startsWith(origin))) {
      return callback(null, true);
    }

    // Allow any localhost
    if (/^https?:\/\/localhost(:\d+)?$/.test(origin)) {
      return callback(null, true);
    }

    // Allow Vercel and Render domains
    if (origin.endsWith('.vercel.app') || origin.endsWith('.onrender.com')) {
      return callback(null, true);
    }

    // In development mode, allow all
    if (process.env.NODE_ENV !== 'production') {
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
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ============================================
// HEALTH CHECK
// ============================================

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// ============================================
// API ROUTES
// ============================================

app.use('/api', routes);

// ============================================
// SERVE STATIC CLIENT IN PRODUCTION IF BUILT
// ============================================

if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));

  app.use((req, res, next) => {
    // If request is targeting /api, let it fall through to 404 handler
    if (req.path.startsWith('/api')) {
      return next();
    }
    // Only serve index.html for GET requests
    if (req.method === 'GET') {
      return res.sendFile(path.join(clientDistPath, 'index.html'));
    }
    next();
  });
} else {
  // If client isn't built on this server (e.g. standalone API service)
  app.get('/', (req, res) => {
    res.json({
      name: 'PrepPilot AI Mock Interview API',
      status: 'online',
      version: '1.0.0',
      endpoints: {
        health: '/health',
        api: '/api'
      }
    });
  });
}

// ============================================
// ERROR HANDLING
// ============================================

app.use(notFoundHandler);
app.use(errorHandler);

export default app;