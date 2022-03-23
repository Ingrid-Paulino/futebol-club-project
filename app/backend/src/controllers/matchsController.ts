import { Request, Response } from 'express';
import matchService from '../services/matchsService';

class MatchController {
  public static async getAllEndSearch(req: Request, res: Response) {
    const { inProgress } = req.query;
    const response = await matchService.getAll(inProgress);
    res.status(200).json(response);
  }
}

export default MatchController;
