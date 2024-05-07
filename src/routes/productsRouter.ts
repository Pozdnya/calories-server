import express from 'express'
import { productController } from '../controllers/product.controller'

export const productsRouter = express.Router()

productsRouter.get('/', productController.getAll)
productsRouter.post('/create', productController.create)
productsRouter.patch('/update', productController.update)
productsRouter.delete('/remove', productController.remove)


