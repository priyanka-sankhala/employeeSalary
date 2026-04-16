import { Request, Response, NextFunction } from 'express';
import { ZodTypeAny } from 'zod';
import { HttpError } from '../errors/http-error';

type RequestTarget = 'body' | 'params' | 'query';

export const validate = (schema: ZodTypeAny, target: RequestTarget = 'body') => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[target]);

    if (!result.success) {
      return next(
        new HttpError(
          400,
          'Invalid request body',
          result.error.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message,
          })),
        ),
      );
    }

    (req as Request)[target] = result.data;
    return next();
  };
};
