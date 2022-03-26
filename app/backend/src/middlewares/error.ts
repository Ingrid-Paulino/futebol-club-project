// import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { NextFunction, Request, Response } from 'express';
import { IError } from '../interfaces/IError';

class ErrorMiddleware {
  static error1(err: IError, _req: Request, res: Response, _next: NextFunction) {
    if (err.status) {
      return res.status(err.status).json({ message: err.message });
    }

    return res.status(500).json({
      error: {
        message: err.message,
      },
    });
  }
}

export default ErrorMiddleware;
