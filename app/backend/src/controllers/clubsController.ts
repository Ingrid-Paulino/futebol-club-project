import { Request, Response } from 'express';
import clubService from '../services/clubService';

class ClubController {
  public static async getAll(req: Request, res: Response) {
    const response = await clubService.getAll();
    res.status(200).json(response);
  }

  public static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const response = await clubService.getById(+id);
    return res.status(200).json(response);
  }
}

export default ClubController;
