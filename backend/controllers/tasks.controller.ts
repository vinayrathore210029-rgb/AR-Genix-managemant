import { Request, Response } from 'express';
import { prisma } from '../server';
import { AuthRequest } from '../middleware/auth.middleware';

export const createTask = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { title, description, assignedTo, projectId } = req.body;

        const newTask = await prisma.task.create({
            data: {
                title,
                description,
                assignedTo,
                projectId,
                status: 'PENDING'
            }
        });

        res.status(201).json({ message: 'Task created successfully', newTask });
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Server error creating task' });
    }
};

export const getTasks = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { role, id } = req.user!;
        let tasks;

        if (role === 'SUPER_ADMIN' || role === 'ADMIN') {
            tasks = await prisma.task.findMany({
                include: { employee: { select: { firstName: true, lastName: true } } }
            });
        } else if (role === 'EMPLOYEE') {
            // Find employee ID for this user
            const employee = await prisma.employee.findUnique({ where: { userId: id } });
            if (!employee) return res.status(404).json({ message: 'Employee profile not found' });

            tasks = await prisma.task.findMany({
                where: { assignedTo: employee.id }
            });
        }

        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Server error fetching tasks' });
    }
};

export const updateTaskStatus = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const id = req.params.id as string;
        const { status } = req.body;

        const updatedTask = await prisma.task.update({
            where: { id },
            data: { status }
        });

        res.json({ message: 'Task status updated', updatedTask });
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Server error updating task' });
    }
};
