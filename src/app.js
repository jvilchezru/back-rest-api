import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// Start server
const app = express();

// Use middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

export default app;
