import { z } from 'zod';

export const createEmployeeSchema = z.object({
  fullName: z.string().trim().min(1, 'fullName is required'),
  jobTitle: z.string().trim().min(1, 'jobTitle is required'),
  country: z.string().trim().min(1, 'country is required'),
  salary: z.number().finite().nonnegative('salary must be non-negative'),
});
