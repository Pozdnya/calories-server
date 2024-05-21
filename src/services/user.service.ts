import { User } from '../models/user';
import { INormalize } from '../types/interfaces';

function normalize({ id, email, name }: INormalize): INormalize {
	return {
		id,
		email,
		name,
	};
}

export const userService = {
	normalize,
};
