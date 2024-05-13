import { NextFunction, Request, Response } from 'express';

export interface IProduct {
	category: string;
	productName: string;
	calories: number;
}

export interface IUser {
	name: string;
	email: string;
	password: string;
}

export interface IError {
	email?: string;
	password?: string;
	name?: string;
}

export type AsyncRequestHandler = (
	req: Request,
	res: Response,
	next: NextFunction,
) => Promise<void>;

export interface IEmailData {
	email: string;
	subject: string;
	html: string;
}
