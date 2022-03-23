import { Request, Response } from 'express';
import clubService from '../services/clubService';

class ClubController {
  public static async getAll(req: Request, res: Response) {
    const response = await clubService.getAll();
    res.status(200).json(response);
  }
}

export default ClubController;
