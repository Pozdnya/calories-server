import { DataTypes, Model, Optional } from 'sequelize';
import { client } from '../db';
import { IUserAttributes } from '../types/interfaces';

interface UserCreationAttributes extends Optional<IUserAttributes, 'activationToken'> {}

export class User
	extends Model<IUserAttributes, UserCreationAttributes>
	implements IUserAttributes
{
	public id!: string;
	public name!: string;
	public email!: string;
	public password!: string;
	public activationToken!: string | null;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

User.init(
	{
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		activationToken: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		sequelize: client,
		modelName: 'User',
		tableName: 'pg_cl_users',
	},
);
