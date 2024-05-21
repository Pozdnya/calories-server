import { Model } from 'sequelize';
import { Product } from '../models/product';
import { IProductAttributes } from '../types/interfaces';

const getAll = async (): Promise<Product[]> => {
	const products: Product[] = await Product.findAll();

	return products;
};

const getOne = async (id: string): Promise<Product | null> => {
	const product = await Product.findByPk(id);

	return product;
};

const create = async ({ id, category, productName, calories }: Product): Promise<Product> => {
	const newProduct = await Product.create({
		id,
		category,
		productName,
		calories,
	});

	return newProduct;
};

const update = async ({
	id,
	category,
	productName,
	calories,
}: Product): Promise<Product | null> => {
	const [affectedCount] = await Product.update(
		{ category, productName, calories },
		{
			where: { id },
		},
	);

	if (affectedCount > 0) {
		return await Product.findByPk(id);
	}

	return null;
};

const remove = async (id: string): Promise<number> => {
	const removed = await Product.destroy({ where: { id } });

	return removed;
};

export const productService = {
	getAll,
	getOne,
	create,
	update,
	remove,
};
