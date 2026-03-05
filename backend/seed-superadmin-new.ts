import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const superAdminEmail = 'amitcarpenter198@mailinator.com';
    const superAdminPassword = 'Super@123';

    const existingAdmin = await prisma.user.findUnique({
        where: { email: superAdminEmail }
    });

    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash(superAdminPassword, 10);

        await prisma.user.create({
            data: {
                email: superAdminEmail,
                password: hashedPassword,
                role: 'SUPER_ADMIN'
            }
        });
        console.log(`Super Admin account (${superAdminEmail}) created successfully.`);
    } else {
        console.log(`Super Admin account (${superAdminEmail}) already exists.`);
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
