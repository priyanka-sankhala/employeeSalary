import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deductionByCountry: Record<string, number> = {
  "India": 0.1,
  "United States": 0.12,
};

export class MetricsController {
  
  async countryMetrics(req: Request, res: Response, next: NextFunction) {
     try {
      const country = req.params.country;

      if (typeof country !== 'string') {
        return res.status(400).json({ message: 'Invalid country' });
      }

      const result = await prisma.employee.aggregate({
        where: { country },
        _avg: { salary: true },
        _min: { salary: true },
        _max: { salary: true },
      });

      // Handle no data case
      if (!result._avg.salary) {
        return res.status(200).json({
          min: null,
          max: null,
          avg: null,
        });
      }

      return res.status(200).json({
        min: result._min.salary,
        max: result._max.salary,
        avg: result._avg.salary,
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
      console.log("jobTitle", jobTitle);
      const result = await prisma.employee.aggregate({
        where: { jobTitle },
        _avg: { salary: true },
      });

      return res.status(200).json({
        avg: result._avg.salary ?? null,
      });
    } catch (error) {
      next(error);
    }
  }
}
