import express from 'express'

export const productsRouter = express.Router()

productsRouter.get('/', (req, res) => {
  res.status(200).send({message: 'OK'})
})

