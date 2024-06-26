import { Request, Response, NextFunction, RequestHandler } from 'express';
import { AsyncRequestHandler } from '../types/interfaces';

export function catchError(action: AsyncRequestHandler): RequestHandler {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await action(req, res, next);
		} catch (error) {
			next(error);
		}
	};
}
