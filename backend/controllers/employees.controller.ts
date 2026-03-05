import { Request, Response } from 'express';
import { prisma } from '../server';
import bcrypt from 'bcryptjs';

export const createEmployee = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password, firstName, lastName, designation, department } = req.body;

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newEmployee = await prisma.$transaction(async (tx: any) => {
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
    } catch (error) {
        console.error('Error creating employee:', error);
        res.status(500).json({ message: 'Server error creating employee' });
    }
};

export const getEmployees = async (req: Request, res: Response): Promise<any> => {
    try {
        const employees = await prisma.employee.findMany({
            include: {
                user: { select: { email: true, createdAt: true } }
            }
        });
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Server error fetching employees' });
    }
};
