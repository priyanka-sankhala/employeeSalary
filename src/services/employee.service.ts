// src/services/employee.service.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class EmployeeService {
  create(data: any) {
    return prisma.employee.create({ data });
  }

  findAll() {
    return prisma.employee.findMany();
  }

  findById(id: string) {
    return prisma.employee.findUnique({ where: { id } });
  }

  update(id: string, data: any) {
    return prisma.employee.update({ where: { id }, data });
  }

  delete(id: string) {
    return prisma.employee.delete({ where: { id } });
  }
}