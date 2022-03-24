import { Request, Response } from 'express';
import matchService from '../services/matchsService';

class MatchController {
  public static async getAllEndSearch(req: Request, res: Response) {
    // fonte: https://stackoverflow.com/questions/61305362/why-request-query-is-not-any-anymore-express-request-query-typescript-error
    const inProgress: string = req.query.inProgress as string;
    if (!inProgress) {
      const response = await matchService.getAll();
      return res.status(200).json(response);
    }

    const response = await matchService.getAllEndSearch(inProgress);
    return res.status(200).json(response);
  }
}

export default MatchController;
