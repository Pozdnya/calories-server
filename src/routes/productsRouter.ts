import express from 'express'
import { productController } from '../controllers/product.controller'
import { catchError } from '../middleware/catchError'

export const productsRouter = express.Router()

productsRouter.get('/', catchError(productController.getAll))
productsRouter.post('/create', catchError(productController.create))
productsRouter.patch('/update/:id', catchError(productController.update))
productsRouter.delete('/remove/:id', catchError(productController.remove))


