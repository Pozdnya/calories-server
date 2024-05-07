import { Request, Response } from "express"
import { client } from "../db"
import { Product } from "../models/product"
import { productService } from "../services/product.service"

const getAll = async (req: Request, res: Response) => {
  const products = await productService.getAll()

  res.send(products)
}

const create = async (req: Request, res: Response) => {
  const { category, productName, calories } = req.body
  const newProduct = await productService.create({ category, productName, calories })

  res.status(201).send(newProduct)
}

const update = async (req: Request, res: Response) => {
  const { category, productName, calories, id } = req.body

  const updated = await productService.update({ id }, { category, productName, calories })

  if (updated.includes(0)) {
    res.status(404).send({ message: "Not Found" })

    return;
  }

  res.status(201).send({ message: "Updated" })
}

const remove = async (req: Request, res: Response) => {
  const { id } = req.body

  const removed = await productService.remove({id})

  if (!removed) {
    res.status(404).send({message: 'Not Found'})

    return;
  }

  res.status(200).send({message: 'Deleted'})
}

export const productController = {
  getAll,
  create,
  update,
  remove,
}