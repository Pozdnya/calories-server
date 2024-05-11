import { IError } from '../types/interfaces';

export class ApiError extends Error {
	status: number;
	errors: IError | {};

	constructor(status: number, message: string, errors?: {}) {
		super(message);

		this.status = status;
		this.errors = errors!;
	}

	static BadRequest(message: string, errors: IError): ApiError {
		return new ApiError(400, message, errors);
	}

	static Unauthorized(): ApiError {
		return new ApiError(401, 'User is not authorized');
	}

	static NotFound(): ApiError {
		return new ApiError(404, 'Not found');
	}
}
