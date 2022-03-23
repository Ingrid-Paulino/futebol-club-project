import { Request, Response, NextFunction } from 'express';
import loginService from '../services/loginService';
import CreateToken from '../services/createToken';
import { ILogin, ILoginError } from '../interfaces/ILogin';
// import validateError from '../utils';
import { StatusCodes, MSG } from '../enum';
// import { LoginMock } from '../types/'

class LoginController {
  public static async createLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password }: ILogin = req.body;
      // console.log('reqBody', req.body);

      const response = await loginService.login({ email, password });
      // console.log({ response });

      // if ('status' in response) {
      //   return validateError(StatusCodes.UNAUTHORIZED, MSG.INCORRECT_LOGIN_PASSWORD);
      // }

      // if ((response as ILoginError).status) {
      //   return validateError(StatusCodes.UNAUTHORIZED, MSG.INCORRECT_LOGIN_PASSWORD);
      // }

      if ((response as ILoginError).status) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: MSG.INCORRECT_EMAIL_PASSWORD });
      }

      const token = CreateToken.createToken({ email, password });

      // console.log({ token });

      return res.status(200).json({ ...response,
        token });
    } catch (error) {
      next(error);
    }
  }

  public static async getAll(req: Request, res: Response) {
    const response = await loginService.getAll();
    res.status(200).json(response);
  }

  public static async getLoginRole(req: Request, res: Response, next: NextFunction) {
    try {
      // console.log('reqBody', req.body);
      const { role } = req.body.user.dataValues;

      return res.status(200).json(role);
    } catch (error) {
      next(error);
    }
  }
}

export default LoginController;
