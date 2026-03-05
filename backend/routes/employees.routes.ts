import { Router } from 'express';
import { createEmployee, getEmployees } from '../controllers/employees.controller';
import { authenticate, authorizeRole } from '../middleware/auth.middleware';

const router = Router();

router.post('/', authenticate, authorizeRole(['SUPER_ADMIN', 'ADMIN']), createEmployee);
router.get('/', authenticate, authorizeRole(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), getEmployees);

export default router;
