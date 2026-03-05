import { Request, Response } from 'express';
import { prisma } from '../server';
import bcrypt from 'bcryptjs';

export const createClient = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password, companyName, contactName, phone } = req.body;

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newClient = await prisma.$transaction(async (tx: any) => {
            const user = await tx.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    role: 'CLIENT',
                }
            });

            const client = await tx.client.create({
                data: {
                    userId: user.id,
                    companyName,
                    contactName,
                    phone
                }
            });

            return client;
        });

        res.status(201).json({ message: 'Client created successfully', newClient });
    } catch (error) {
        console.error('Error creating client:', error);
        res.status(500).json({ message: 'Server error creating client' });
    }
};

export const getClients = async (req: Request, res: Response): Promise<any> => {
    try {
        const clients = await prisma.client.findMany({
            include: { user: { select: { email: true } } }
        });
        res.json(clients);
    } catch (error) {
        res.status(500).json({ message: 'Server error fetching clients' });
    }
};
