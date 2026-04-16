import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class MetricsService {
  getSalaryMetricsByCountry(country: string) {
    return prisma.employee.aggregate({
      where: { country },
      _avg: { salary: true },
      _min: { salary: true },
      _max: { salary: true },
    });
  }

  getAverageSalaryByJobTitle(jobTitle: string) {
    return  prisma.employee.aggregate({
      where: { jobTitle },
      _avg: { salary: true },
    });
  }

}