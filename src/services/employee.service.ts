import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
type Employee = {
  fullName: string;
  jobTitle: string;
  country: string;
  salary: number;
};
export class EmployeeService {
  create(data: Employee) {
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