import express from 'express';
import employeeRoutes from './routes/employee.routes';
import { errorHandler } from './middlewares/error-handler';
import 'dotenv/config';
const app = express();
app.use(express.json());
app.use('/employees', employeeRoutes);
app.use(errorHandler);
export default app;