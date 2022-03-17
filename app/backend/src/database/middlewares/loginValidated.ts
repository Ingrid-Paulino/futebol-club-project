import { NextFunction, Request, Response } from 'express';

export default class loginValidation {
  public static async validateParams(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
  }
};