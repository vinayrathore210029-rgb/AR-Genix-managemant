"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskStatus = exports.getTasks = exports.createTask = void 0;
const server_1 = require("../server");
const createTask = async (req, res) => {
    try {
        const { title, description, assignedTo, projectId } = req.body;
        const newTask = await server_1.prisma.task.create({
            data: {
                title,
                description,
                assignedTo,
                projectId,
                status: 'PENDING'
            }
        });
        res.status(201).json({ message: 'Task created successfully', newTask });
    }
    catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Server error creating task' });
    }
};
exports.createTask = createTask;
const getTasks = async (req, res) => {
    try {
        const { role, id } = req.user;
        let tasks;
        if (role === 'SUPER_ADMIN' || role === 'ADMIN') {
            tasks = await server_1.prisma.task.findMany({
                include: { employee: { select: { firstName: true, lastName: true } } }
            });
        }
        else if (role === 'EMPLOYEE') {
            // Find employee ID for this user
            const employee = await server_1.prisma.employee.findUnique({ where: { userId: id } });
            if (!employee)
                return res.status(404).json({ message: 'Employee profile not found' });
            tasks = await server_1.prisma.task.findMany({
                where: { assignedTo: employee.id }
            });
        }
        res.json(tasks);
    }
    catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Server error fetching tasks' });
    }
};
exports.getTasks = getTasks;
const updateTaskStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const { status } = req.body;
        const updatedTask = await server_1.prisma.task.update({
            where: { id },
            data: { status }
        });
        res.json({ message: 'Task status updated', updatedTask });
    }
    catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Server error updating task' });
    }
};
exports.updateTaskStatus = updateTaskStatus;
