import { Request, Response, NextFunction } from 'express';
import loginService from '../services/loginService';
import CreateToken from '../services/createToken';
import { ILogin, ILoginError } from '../interfaces/ILogin';

class LoginController {
  public static async createLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password }: ILogin = req.body;
      const response = await loginService.login({ email, password });

      if ((response as ILoginError).status) return next(response);
      const token = CreateToken.createToken({ email, password });

      return res.status(200).json({ ...response, token });
    } catch (error) {
      next(error);
    }
  }

  public static async getLoginRole(req: Request, res: Response, next: NextFunction) {
    try {
      const { role } = req.body.user.dataValues;
      return res.status(200).json(role);
    } catch (error) {
      next(error);
    }
  }
}

export default LoginController;
