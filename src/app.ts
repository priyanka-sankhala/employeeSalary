import express from 'express';
import employeeRoutes from './routes/employee.routes';
import 'dotenv/config';
const app = express();
app.use(express.json());
app.use('/employees', employeeRoutes);
console.log("here")
export default app;