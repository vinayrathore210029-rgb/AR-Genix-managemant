import { Router } from 'express';
import { createTask, getTasks, updateTaskStatus } from '../controllers/tasks.controller';
import { authenticate, authorizeRole } from '../middleware/auth.middleware';

const router = Router();

router.post('/', authenticate, authorizeRole(['SUPER_ADMIN', 'ADMIN']), createTask);
router.get('/', authenticate, getTasks);
router.patch('/:id/status', authenticate, updateTaskStatus);

export default router;
