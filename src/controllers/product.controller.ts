import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { productService } from '../services/product.service';
import { Product } from '../models/product';

const getAll = async (req: Request, res: Response): Promise<void> => {
	const products = await productService.getAll();

	res.send(products);
};

const getProductById = async (req: Request, res: Response): Promise<void> => {
	const { id } = req.params;
	const product = await productService.getOne(id);

	res.send(product);
};

const create = async (req: Request, res: Response): Promise<void> => {
	const { category, productName, calories } = req.body;
	const id = uuidv4();

	const newProduct = await productService.create({
		id,
		category,
		productName,
		calories,
	} as Product);

	res.status(201).send(newProduct);
};

const update = async (req: Request, res: Response): Promise<void> => {
	const { category, productName, calories } = req.body;
	const { id } = req.params;

	const updated = await productService.update({ id, category, productName, calories } as Product);

	if (!updated) {
		res.status(404).send({ message: 'Not Found' });

		return;
	}

	res.status(201).send({ message: 'Updated' });
};

const remove = async (req: Request, res: Response): Promise<void> => {
	const { id } = req.params;

	const removed = await productService.remove(id);

	if (!removed) {
		res.status(404).send({ message: 'Not Found' });

		return;
	}

	res.status(204).send({ message: 'Deleted' });
};

export const productController = {
	getAll,
	getProductById,
	create,
	update,
	remove,
};
