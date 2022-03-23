import { Request, Response } from 'express';
import matchService from '../services/matchsService';

class MatchController {
  public static async getAllEndSearch(req: Request, res: Response) {
    // fonte: https://stackoverflow.com/questions/61305362/why-request-query-is-not-any-anymore-express-request-query-typescript-error
    console.log('0iiiii1');

    const inProgress: string = req.query.inProgress as string;
    console.log({ inProgress });

    const response = await matchService.getAll(inProgress);
    console.log({ response });

    res.status(200).json(response);
  }
}

export default MatchController;
