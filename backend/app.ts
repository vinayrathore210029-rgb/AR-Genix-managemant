import express, { Express } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import employeeRoutes from './routes/employees.routes';
import taskRoutes from './routes/tasks.routes';
import clientRoutes from './routes/clients.routes';

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/clients', clientRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'AR-Genix API is running' });
});

export default app;
