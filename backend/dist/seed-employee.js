"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
async function main() {
    const employeeEmail = 'vinay.argenixaisolutions@gmail.com';
    const employeePassword = 'Vinay@123';
    let existingUser = await prisma.user.findUnique({
        where: { email: employeeEmail }
    });
    if (!existingUser) {
        const hashedPassword = await bcryptjs_1.default.hash(employeePassword, 10);
        existingUser = await prisma.user.create({
            data: {
                email: employeeEmail,
                password: hashedPassword,
                role: 'EMPLOYEE'
            }
        });
        console.log('--- DB SEED SCRIPT ---');
        console.log('Action: CREATED');
        console.log('Email:', existingUser.email);
        console.log('Role:', existingUser.role);
        console.log('ID:', existingUser.id);
        console.log('----------------------');
    }
    else {
        console.log('--- DB SEED SCRIPT ---');
        console.log('Action: ALREADY EXISTS');
        console.log('Email:', existingUser.email);
        console.log('Role:', existingUser.role);
        console.log('ID:', existingUser.id);
        console.log('----------------------');
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
