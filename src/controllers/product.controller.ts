import { Request, Response } from 'express';
import { productService } from '../services/product.service';

const getAll = async (req: Request, res: Response): Promise<void> => {
	const products = await productService.getAll();

	res.send(products);
};

const create = async (req: Request, res: Response): Promise<void> => {
	const { category, productName, calories } = req.body;
	const newProduct = await productService.create({ category, productName, calories });

	res.status(201).send(newProduct);
};

const update = async (req: Request, res: Response): Promise<void> => {
	const { category, productName, calories } = req.body;
	const { id } = req.params;

	const updated = await productService.update(
		{ id: Number(id) },
		{ category, productName, calories },
	);

	if (!updated) {
		res.status(404).send({ message: 'Not Found' });

		return;
	}

	res.status(201).send({ message: 'Updated' });
};

const remove = async (req: Request, res: Response): Promise<void> => {
	const { id } = req.params;

	const removed = await productService.remove({ id: Number(id) });

	if (!removed) {
		res.status(404).send({ message: 'Not Found' });

		return;
	}

	res.status(204).send({ message: 'Deleted' });
};

export const productController = {
	getAll,
	create,
	update,
	remove,
};
