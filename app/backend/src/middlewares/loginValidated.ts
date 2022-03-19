import { NextFunction, Request, Response } from 'express';
import { Login } from '../interfaces/Ilogin';
import validateError from '../utils';
import Schema from '../schemas';

export default class LoginValidation {
  public static async validateParams(req: Request, res: Response, next: NextFunction) {
    const { email, password }: Login = req.body;
    const { error } = Schema.loginSchema.validate({ email, password });

    if (error) return validateError(400, error.details[0].message);

    next();
  }
}

// const LoginValidation = (req: Request, _res: Response, next: NextFunction) => {
//   console.log(req.body);
//   const { email, password } : Login = req.body;
//   console.log('email', email);
//   console.log('senha', password);

//   const { error } = Schema.loginSchema.validate({ email, password });

//   if (error) return validateError(400, error.details[0].message);

//   next();
// };

// export default LoginValidation;
