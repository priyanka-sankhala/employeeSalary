import { Router } from 'express';
import { SalaryController } from '../controllers/salary.controller';
import { validate } from '../middlewares/validate';
import { calculateSalarySchema } from '../validations/salary.validation';

const router = Router();
const controller = new SalaryController();

router.post('/calculate', validate(calculateSalarySchema), controller.calculate);

export default router;
