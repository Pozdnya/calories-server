import { NextFunction, Request, Response } from "express";
import { authService } from "../services/auth.service";
import { ApiError } from "../exception/ApiError";
import { IError } from "../types/interfaces";

function validateEmail(email: string) {
  const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

  if (!emailPattern.test(email)) {
    return 'Email is invalid'
  }
}

function validatePassword(password: string) {
  if (!password) {
    return `Field can't be empty`
  }

  if (password.length < 6) {
    return 'At list 6 characters'
  }
}

function validateName(name: string) {
  if (!name) {
    return `Field can't be empty`
  }

  if (name[0].toUpperCase() !== name[0]) {
    return 'Should start with a capital character'
  }
}

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body

  const validationErrors: IError = {
    name: validateName(name) || '',
    email: validateEmail(email) || '',
    password: validatePassword(password) || '',
  }

  if (
    validationErrors.email
    || validationErrors.password
    || validationErrors.name
  ) {
    throw ApiError.BadRequest('Validation errors', validationErrors)
  }

  await authService.register({ name, email, password })

  res.status(201).send({message: 'User created'})
}

export const authController = {
  register
}