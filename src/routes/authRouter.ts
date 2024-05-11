import express from 'express';
import { authController } from '../controllers/auth.controller';
import { catchError } from '../middleware/catchError';

export const authRouter = express.Router();

authRouter.post('/register', catchError(authController.register));
