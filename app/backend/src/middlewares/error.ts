import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
// import { ErrorRequestHandler } from 'express';

class ErrorMiddleware {
//   public error1: number & string;

  // constructor() {
  //   this.error1();
  // }

  static error1(err: ErrorRequestHandler, _req: Request, res: Response, _next: NextFunction) {
    if (err.status) {
      return res.status(err.status).json({ message: err.message });
    }

    return res.status(500).json({
      error: {
        message: err.message,
      }
    })
  }
}

// const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
//   console.log('ErrorRequestHandler', err);

//   if (err.status) {
//     return res.status(err.status).json({ message: err.message });
//   }

//   return res.status(500).json({
//     error: {
//       message: err.message,
//     },
//   });
// };

// const errorMiddleware: ErrorRequestHandler = (
//   err: ErrorRequestHandler,
//   _req: Request,
//   _res: Response,
//   _next: NextFunction,
// ) => {
//   console.log('ErrorRequestHandler', err);

//   // if (err.status) {
//   //   return res.status(err.status).json({ message: err.message });
//   // }

//   // return res.status(500).json({
//   //   error: {
//   //     message: err.message,
//   //   },
//   // });
// };



export default ErrorMiddleware;
