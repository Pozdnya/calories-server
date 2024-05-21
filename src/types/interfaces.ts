import { NextFunction, Request, Response } from 'express';

export interface IProductAttributes {
	id: string;
	category: string;
	productName: string;
	calories: number;
}

export interface IUserAttributes {
	id: string;
	name: string;
	email: string;
	password: string;
	activationToken: string | null;
}

export interface ITokenAttributes {
	refreshToken: string;
}

export interface INormalize {
	name: string;
	email: string;
	id: string;
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
