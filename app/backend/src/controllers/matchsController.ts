import { Request, Response } from 'express';
import matchService from '../services/matchsService';

class MatchController {
  public static async getAll(req: Request, res: Response) {
    const response = await matchService.getAll();
    res.status(200).json(response);
  }
}

export default MatchController;
