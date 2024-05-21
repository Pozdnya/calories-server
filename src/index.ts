import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { productsRouter } from './routes/products.router';
import { authRouter } from './routes/auth.router';

const app = express();

app.use(
	cors({
		credentials: true,
	}),
);
app.use(express.json());

app.use('/products', productsRouter);
app.use('/auth', authRouter);

app.listen(process.env.PORT, () => {
	console.log(`Listening on http://localhost:${process.env.PORT}`);
});
