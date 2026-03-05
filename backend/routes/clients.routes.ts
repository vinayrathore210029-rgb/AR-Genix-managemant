import { Router } from 'express';
import { createClient, getClients } from '../controllers/clients.controller';
import { authenticate, authorizeRole } from '../middleware/auth.middleware';

const router = Router();

router.post('/', authenticate, authorizeRole(['SUPER_ADMIN']), createClient);
router.get('/', authenticate, authorizeRole(['SUPER_ADMIN', 'ADMIN']), getClients);

export default router;
