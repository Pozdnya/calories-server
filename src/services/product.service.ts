import { Model } from 'sequelize';
import { Product } from '../models/product';
import { IProduct } from '../types/interfaces';

const getAll = async (): Promise<Model<IProduct, {}>[] | null> => {
	const products: Model<IProduct, {}>[] | null = await Product.findAll();

	return products;
};

const create = async ({
	category,
	productName,
	calories,
}: IProduct): Promise<Model<IProduct, {}> | null> => {
	const newProduct: Model<IProduct, {}> | null = await Product.create({
		category,
		productName,
		calories,
	});

	return newProduct;
};

const update = async (
	{ id }: { id: number },
	{ category, productName, calories }: IProduct,
): Promise<[affectedCount: number]> => {
	const updated = await Product.update(
		{ category, productName, calories },
		{
			where: { id },
		},
	);

	return updated;
};

const remove = async ({ id }: { id: number }): Promise<number> => {
	const removed = await Product.destroy({ where: { id } });

	return removed;
};

export const productService = {
	getAll,
	create,
	update,
	remove,
};
