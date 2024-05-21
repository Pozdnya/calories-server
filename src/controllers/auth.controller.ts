import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { authService } from '../services/auth.service';
import { ApiError } from '../exception/ApiError';
import { IError } from '../types/interfaces';
import { User } from '../models/user';
import { userService } from '../services/user.service';

function validateEmail(email: string): string | undefined {
	const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

	if (!emailPattern.test(email)) {
		return 'Email is invalid';
	}
}

function validatePassword(password: string): string | undefined {
	if (!password) {
		return `Field can't be empty`;
	}

	if (password.length < 6) {
		return 'At list 6 characters';
	}
}

function validateName(name: string): string | undefined {
	if (!name) {
		return `Field can't be empty`;
	}

	if (name[0].toUpperCase() !== name[0]) {
		return 'Should start with a capital character';
	}
}

const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const { name, email, password } = req.body;

	const validationErrors: IError = {
		name: validateName(name) || '',
		email: validateEmail(email) || '',
		password: validatePassword(password) || '',
	};

	if (validationErrors.email || validationErrors.password || validationErrors.name) {
		throw ApiError.BadRequest('Validation errors', validationErrors);
	}

	const newUser = await authService.register({ name, email, password });

	res.status(201).send({ message: 'User created', newUser });
};

const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const { email, password } = req.body;

	const user = await authService.getByEmail(email);

	if (!user) {
		throw ApiError.BadRequest('User with this email does not exist');
	}

	const isValidPassword = bcrypt.compare(password, user.dataValues.password);

	if (!isValidPassword) {
		throw ApiError.BadRequest('Wrong password');
	}

	res.status(200).send({ message: 'Login successeful', user });
};

const sendActivation = async (res: Response, { id, name, email }: User): Promise<void> => {
	const normalizedUser = userService.normalize({
		id,
		name,
		email,
	});
};

export const authController = {
	register,
	login,
};
