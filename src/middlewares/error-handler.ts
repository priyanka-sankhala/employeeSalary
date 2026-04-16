import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors/http-error';

type PrismaLikeError = {
  code?: string;
  message?: string;
};

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      error: err.message,
      ...(err.details ? { details: err.details } : {}),
    });
  }

  const prismaError = err as PrismaLikeError;
  if (prismaError?.code === 'P2025') {
    return res.status(404).json({ error: 'Employee not found' });
  }

  return res.status(500).json({
    error: 'Internal server error',
  });
};
