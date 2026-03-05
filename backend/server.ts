import app from './app';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const PORT = process.env.PORT || 5000;
export const prisma = new PrismaClient();

async function startServer() {
    try {
        await prisma.$connect();
        console.log('Database connected successfully');

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        await prisma.$disconnect();
        process.exit(1);
    }
}

startServer();
