import express from "express";

export const authRouter = express.Router()

authRouter.post('/', (req, res) => {
  res.send('Login')
})
authRouter.post('/register', (req, res) => {})