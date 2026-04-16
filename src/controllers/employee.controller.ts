import { Request, Response } from 'express';
import { EmployeeService } from '../services/employee.service';
import { HttpError } from '../errors/http-error';

const service = new EmployeeService();

export class EmployeeController {
  async create(req: Request, res: Response) {
    const emp = await service.create(req.body);
    res.status(201).json(emp);
  }

  async getAll(req: Request, res: Response) {
    res.json(await service.findAll());
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    if (!id || Array.isArray(id)) throw new HttpError(400, 'Invalid id param');
    const emp = await service.findById(id);
    if (!emp) throw new HttpError(404, 'Employee not found');
    res.json(emp);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    if (!id || Array.isArray(id)) throw new HttpError(400, 'Invalid id param');
    const emp = await service.update(id, req.body);
    res.json(emp);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    if (!id || Array.isArray(id)) throw new HttpError(400, 'Invalid id param');
    await service.delete(id);
    res.status(204).send();
  }
}