import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import validateError from '../../utils';
import UserModel from '../../database/models/usersModel';
import { DecodeData, Secret } from '../../types';
import { StatusCodes, MSG } from '../../enum';

class ValidateJWT {
  static key() {
    const SECRET: Secret = fs.readFileSync('jwt.evaluation.key', 'utf8');
    return SECRET;
  }

  static async verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    // const { authorization } = req.headers;

    if (!token || token === '') return res.status(401).json({ message: 'Token not found' });

    try {
      const decoded = jwt.verify(token, ValidateJWT.key()) as DecodeData;
      // console.log({ decoded });

      const user = await UserModel.findOne({ where: { email: decoded.data.email } });
      if (!user) return res.status(404).json({ message: 'User does not exist' });
      req.body = { ...req.body, user };

      next();
    } catch (err) {
      next(validateError(StatusCodes.UNAUTHORIZED, MSG.TOKEN_INVALID));
    }
  }
}

export default ValidateJWT;
