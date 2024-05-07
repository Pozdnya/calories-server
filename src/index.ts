import express from 'express';
import cors from 'cors';
import { productsRouter } from './routes/productsRouter';
import 'dotenv/config';

const app = express()

app.use(cors({
  credentials: true,
}))
app.use(express.json())

app.use('/products', productsRouter)

app.listen(process.env.PORT, () => {
  console.log(`Listening on http://localhost:${process.env.PORT}`);
})

