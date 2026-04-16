import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { MetricsService } from "../services/metrics.service";
//import  MetricsService  from '../services/metrics.service';

const prisma = new PrismaClient();

const deductionByCountry: Record<string, number> = {
  "India": 0.1,
  "United States": 0.12,
};
const service = new MetricsService();
export class MetricsController {

  async countryMetrics(req: Request, res: Response, next: NextFunction) {
    try {
      const { country } = req.params;

      if (typeof country !== 'string') {
        return res.status(400).json({ message: 'Invalid country' });
      }

      const result = await service.getSalaryMetricsByCountry(country);

      return res.status(200).json({
        min: result?._min?.salary ?? null,
        max: result?._max?.salary ?? null,
        avg: result?._avg?.salary ?? null,
      });

    } catch (error) {
      next(error);
    }
  }

  async jobTitleMetrics(req: Request, res: Response, next: NextFunction) {
    try {
      const { jobTitle } = req.params;

      if (typeof jobTitle !== 'string') {
        return res.status(400).json({ message: 'Invalid jobTitle' });
      }

      const result = await service.getAverageSalaryByJobTitle(jobTitle);

      return res.status(200).json({
        avg: result?._avg?.salary ?? null,
      });

    } catch (error) {
      next(error);
    }
  }
}
