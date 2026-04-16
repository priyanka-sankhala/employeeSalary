// src/routes/employee.routes.ts
import { Router } from 'express';
import { EmployeeController } from '../controllers/employee.controller';
import { validate } from '../middlewares/validate';
import { createEmployeeSchema } from '../validations/employee.validation';

const router = Router();
const controller = new EmployeeController();

router.post('/', validate(createEmployeeSchema), controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);


export default router;