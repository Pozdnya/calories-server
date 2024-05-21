import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { ApiError } from '../exception/ApiError';
import { emailService } from './email.service';
import { User } from '../models/user';

const register = async ({
	name,
	email,
	password,
}: Pick<User, 'name' | 'email' | 'password'>): Promise<void> => {
	const isExistUser = await getByEmail(email);

	if (isExistUser) {
		throw ApiError.BadRequest('Validation error', {
			email: 'Email has already used',
		});
	}

	const id = uuidv4();
	const activationToken = uuidv4();
	const hash = await bcrypt.hash(password, 10);

	await User.create({
		id,
		name,
		email,
		password: hash,
		activationToken,
	});

	await emailService.activationEmail(email, activationToken);
};

function getByEmail(email: string): Promise<User | null> {
	return User.findOne({ where: { email } });
}

export const authService = {
	register,
	getByEmail,
};
