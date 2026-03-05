"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmployees = exports.createEmployee = void 0;
const server_1 = require("../server");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createEmployee = async (req, res) => {
    try {
        const { email, password, firstName, lastName, designation, department } = req.body;
        const existingUser = await server_1.prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const newEmployee = await server_1.prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    role: 'EMPLOYEE',
                }
            });
            const employee = await tx.employee.create({
                data: {
                    userId: user.id,
                    firstName,
                    lastName,
                    designation,
                    department
                }
            });
            return employee;
        });
        res.status(201).json({ message: 'Employee created successfully', newEmployee });
    }
    catch (error) {
        console.error('Error creating employee:', error);
        res.status(500).json({ message: 'Server error creating employee' });
    }
};
exports.createEmployee = createEmployee;
const getEmployees = async (req, res) => {
    try {
        const employees = await server_1.prisma.employee.findMany({
            include: {
                user: { select: { email: true, createdAt: true } }
            }
        });
        res.json(employees);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error fetching employees' });
    }
};
exports.getEmployees = getEmployees;
