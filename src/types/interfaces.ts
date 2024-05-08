import { NextFunction, Request, Response } from "express";

export interface IProduct {
  category: string;
  productName: string;
  calories: number;
}

export type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;
