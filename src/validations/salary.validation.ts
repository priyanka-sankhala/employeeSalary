import { z } from 'zod';

export const calculateSalarySchema = z.object({
  country: z.string().trim().min(1, 'country is required'),
  salary: z.number().nonnegative('salary must be non-negative'),
});
