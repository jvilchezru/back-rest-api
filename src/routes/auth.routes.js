import { Router } from 'express';
import { register, login, logout, profile } from '../controllers/user.controller.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

// Requests
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile', authRequired, profile);

export default router;
