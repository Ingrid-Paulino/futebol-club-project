import { NextFunction, Request, Response } from 'express';
import { ILogin } from '../interfaces/ILogin';
import validateError from '../utils';
import Schema from '../schemas';

export default class LoginValidation {
  public static async validateParams(req: Request, _res: Response, next: NextFunction) {
    const { email, password }: ILogin = req.body;
    if (!email || !password) return next(validateError(401, 'All fields must be filled'));
    const { error } = Schema.loginSchema.validate({ email, password });
    if (error) return next(validateError(401, 'Incorrect email or password'));
    next();
  }
}
