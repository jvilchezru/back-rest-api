import { createAccessToken } from '../libs/jwt.js';
import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the email exists
        const userFound = await User.findOne({ email });
        if (userFound) return res.status(400).json(['Email in use']);

        // Hashear password
        const passwordHash = await bcryptjs.hash(password, 10);

        // Create user and and save to database
        const newUser = new User({
            username,
            email,
            password: passwordHash
        });
        const savedUser = await newUser.save();

        // Use token and create cookie
        const token = await createAccessToken({ id: savedUser._id });
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

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Save user found
        const userFound = await User.findOne({ email });
        if (!userFound) return res.status(400).json(['User not found']);

        // Verify password
        const isMatch = await bcryptjs.compare(password, userFound.password);
        if (!isMatch) return res.status(400).json(['Incorrect password']);

        // Use token and create cookie
        const token = await createAccessToken({ id: userFound._id });
        res.cookie('token', token);

        // Customer response
        res.json({
            email: userFound.email,
            username: userFound.username,
            id: userFound._id,
            createAt: userFound.createdAt
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const logout = (req, res) => {
    res.cookie('token', '', {
        expires: new Date(0)
    });
    return res.sendStatus(200);
};

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id);
    if (userFound) return res.status(400).json(['User not found']);

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email
    });
};
