import { createAccessToken } from '../libs/jwt.js';
import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const userFound = await User.findOne({ email });
        if (userFound) return res.status(400).json(['Email in use']);

        const passwordHash = await bcryptjs.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: passwordHash
        });

        // Save to database
        const savedUser = await newUser.save();

        // Use token
        const token = await createAccessToken({ id: savedUser._id });

        // Create cookie
        res.cookie('token', token);

        // Customer response
        res.json({
            email: savedUser.email,
            username: savedUser.username,
            id: savedUser._id
        });
    } catch (error) {
        res.status(500).json([error.message]);
    }
};

export const login = async (req, res) => {};
