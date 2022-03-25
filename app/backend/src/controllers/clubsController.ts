import { NextFunction, Request, Response } from 'express';
import clubService from '../services/clubService';

class ClubController {
  public static async getAll(req: Request, res: Response) {
    const response = await clubService.getAll();
    res.status(200).json(response);
  }

  public static async getById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const response = await clubService.getById(+id);
    if ('status' in response) return next(response);

    return res.status(200).json(response);
  }
}

export default ClubController;
