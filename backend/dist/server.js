"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
exports.prisma = new client_1.PrismaClient();
async function startServer() {
    try {
        await exports.prisma.$connect();
        console.log('Database connected successfully');
        app_1.default.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        await exports.prisma.$disconnect();
        process.exit(1);
    }
}
startServer();
