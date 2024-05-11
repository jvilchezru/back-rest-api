import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';

// Start server
const app = express();

// Use middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Use routes
app.use('/api', authRoutes);

export default app;
