import { Request, Response } from 'express';
import { prisma } from '../server';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt';

export const loginUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({ message: 'Email, password, and role are required' });
        }

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        if (user.role !== role) {
            return res.status(403).json({ message: 'Unauthorized role selected' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user.id, user.role);

        res.json({
            message: 'Logged in successfully',
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
};
