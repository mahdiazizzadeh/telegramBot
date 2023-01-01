import type { NextFunction, Request, Response } from "express";

const wrapper =
  (fn: (req: Request, res: Response) => any) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res)).catch((e: any) => next(e));

export default wrapper;
