import type { Response } from "express";

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
  }
}

export const send = <T>(res: Response, data: T, statusCode = 200) => {
  res.status(statusCode).json({ data });
};
