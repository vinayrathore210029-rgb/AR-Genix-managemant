import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const superAdminEmail = 'admin@argenix.com';
    const superAdminPassword = 'password123'; // Change in production!

    const existingAdmin = await prisma.user.findUnique({
        where: { email: superAdminEmail }
    });

    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash(superAdminPassword, 10);

        await prisma.user.create({
            data: {
                email: superAdminEmail,
                password: hashedPassword,
                role: 'SUPER_ADMIN' // Using String instead of Enum for SQLite compatibility
            }
        });
        console.log('Super Admin account created successfully.');
    } else {
        console.log('Super Admin account already exists.');
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
