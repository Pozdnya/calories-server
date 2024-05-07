import { Product } from "../models/product"
import { IProduct } from "../types/interfaces";

const getAll = async () => {
  const products = await Product.findAll()

  return products;
}

const create = async ({ category, productName, calories }: IProduct) => {
  const newProduct = await Product.create({ category, productName, calories })

  return newProduct
}

const update = async ({ id }: { id: number }, { category, productName, calories }: IProduct) => {
  const updated = await Product.update(
    { category, productName, calories },
    {
      where: { id }
    })

    return updated
}

const remove = async ({ id }: { id: number }) => {
  const removed = await Product.destroy({ where: { id } })

  return removed
}

export const productService = {
  getAll,
  create,
  update,
  remove,
}