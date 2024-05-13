import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { ApiError } from '../exception/ApiError';
import { User } from '../models/user';
import { IUser } from '../types/interfaces';
import { Model } from 'sequelize';
import { emailService } from './email.service';

const register = async ({ name, email, password }: IUser): Promise<void> => {
	const isExistUser = await getByEmail(email);

	if (isExistUser) {
		throw ApiError.BadRequest('Validation error', {
			email: 'Email has already used',
		});
	}

	const activationToken = uuidv4();
	const hash = await bcrypt.hash(password, 10);

	await User.create({
		name,
		email,
		password: hash,
		activationToken,
	});

	await emailService.activationEmail(email, activationToken);
};

function getByEmail(email: string): Promise<Model<typeof User, {}> | null> {
	return User.findOne({ where: { email } });
}

export const authService = {
	register,
};
