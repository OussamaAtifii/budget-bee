import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { AppError } from '../errors/AppError';

export default function errorHandlerMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(error);

  if (error instanceof z.ZodError) {
    const errorMessages = error.errors.map((err) => err.message);
    return res.status(400).json({ error: errorMessages });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ error: error.message });
  }

  return res
    .status(500)
    .json({ error: error.message || 'Internal server error' });
}
