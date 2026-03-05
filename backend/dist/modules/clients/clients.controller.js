"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClients = exports.createClient = void 0;
const server_1 = require("../../server");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createClient = async (req, res) => {
    try {
        const { email, password, companyName, contactName, phone } = req.body;
        const existingUser = await server_1.prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const newClient = await server_1.prisma.$transaction(async (tx) => {
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
    }
    catch (error) {
        console.error('Error creating client:', error);
        res.status(500).json({ message: 'Server error creating client' });
    }
};
exports.createClient = createClient;
const getClients = async (req, res) => {
    try {
        const clients = await server_1.prisma.client.findMany({
            include: { user: { select: { email: true } } }
        });
        res.json(clients);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error fetching clients' });
    }
};
exports.getClients = getClients;
