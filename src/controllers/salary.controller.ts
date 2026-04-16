import { Request, Response } from 'express';
import { HttpError } from '../errors/http-error';

const deductionByCountry: Record<string, number> = {
  India: 0.1,
  'United States': 0.12,
};

export class SalaryController {
  calculate(req: Request, res: Response) {
    const { country, salary } = req.body as { country: string; salary: number };
    const deductionRate = deductionByCountry[country] ?? 0;
    const deductions = salary * deductionRate;
    const net = salary - deductions;

    return res.status(200).json({
      country,
      gross: salary,
      deductions,
      net,
    });
  }
}
