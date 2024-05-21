import { DataTypes, Model } from 'sequelize';
import { client } from '../db';
import { IProductAttributes } from '../types/interfaces';

interface ProductCreationAttributes extends IProductAttributes {}

export class Product
	extends Model<IProductAttributes, ProductCreationAttributes>
	implements IProductAttributes
{
	public id!: string;
	public productName!: string;
	public category!: string;
	public calories!: number;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

Product.init(
	{
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
		},
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
	},
	{
		sequelize: client,
		modelName: 'Product',
		tableName: 'pg_cl_products',
	},
);
