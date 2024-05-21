import { client } from '../db';
import { User } from './user';
import { ITokenAttributes } from '../types/interfaces';
import { DataTypes, Model } from 'sequelize';

interface TokenCreationAttributes extends ITokenAttributes {}

export class Token
	extends Model<ITokenAttributes, TokenCreationAttributes>
	implements ITokenAttributes
{
	public refreshToken!: string;
}

Token.init(
	{
		refreshToken: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize: client,
		modelName: 'Token',
		tableName: 'pg_cl_token',
	},
);

Token.belongsTo(User);
User.hasOne(Token);
