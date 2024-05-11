import { DataTypes } from 'sequelize';
import { client } from '../db';

export const Product = client.define('pg_cl_products', {
	productName: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	category: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	calories: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});
