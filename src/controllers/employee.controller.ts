// src/controllers/employee.controller.ts
import { Request, Response } from 'express';
import { EmployeeService } from '../services/employee.service';
import { z } from 'zod';

const service = new EmployeeService();
const createEmployeeSchema = z.object({
  fullName: z.string().trim().min(1, 'fullName is required'),
  jobTitle: z.string().trim().min(1, 'jobTitle is required'),
  country: z.string().trim().min(1, 'country is required'),
  salary: z.number().finite().nonnegative('salary must be non-negative'),
});

export class EmployeeController {
  async create(req: Request, res: Response) {
    const validationResult = createEmployeeSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Invalid request body',
        details: validationResult.error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
      });
    }

    const emp = await service.create(validationResult.data);
    res.status(201).json(emp);
  }

  async getAll(req: Request, res: Response) {
    res.json(await service.findAll());
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    if (!id || Array.isArray(id)) return res.status(400).json({ error: 'Invalid id param' });
    const emp = await service.findById(id);
    if (!emp) return res.status(404).send();
    res.json(emp);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    if (!id || Array.isArray(id)) return res.status(400).json({ error: 'Invalid id param' });
    const emp = await service.update(id, req.body);
    res.json(emp);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    if (!id || Array.isArray(id)) return res.status(400).json({ error: 'Invalid id param' });
    await service.delete(id);
    res.status(204).send();
  }
}