import type { NextFunction, Request, Response } from "express";
import type { AnyZodObject } from "zod";

export const validate =
  (schema: AnyZodObject) => (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query
    });

    if (!result.success) {
      return next(result.error);
    }

    if (result.data.body) req.body = result.data.body;
    if (result.data.params) Object.assign(req.params, result.data.params);
    if (result.data.query) Object.assign(req.query, result.data.query);
    return next();
  };
