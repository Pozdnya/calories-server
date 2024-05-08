import express from 'express'
import { productController } from '../controllers/product.controller'

export const productsRouter = express.Router()

productsRouter.get('/', productController.getAll)
productsRouter.post('/create', productController.create)
productsRouter.patch('/update/:id', productController.update)
productsRouter.delete('/remove/:id', productController.remove)


