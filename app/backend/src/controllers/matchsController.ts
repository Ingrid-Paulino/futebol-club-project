import { Request, Response } from 'express';
import matchService from '../services/matchsService';
import { ICreateMatch } from '../interfaces/IMatch';

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

  public static async createMatch(req: Request, res: Response) {
    const {
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress,
    }: ICreateMatch = req.body;

    const response = await matchService.createMatch({
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress,
    });
    console.log('response', response);

    // if (response.homeTeam === response.awayTeam) {
    //   return res.
    // }

    return res.status(200).json({
      id: response.id,
      homeTeam: response.homeTeam,
      awayTeam: response.awayTeam,
      homeTeamGoals: response.homeTeamGoals,
      awayTeamGoals: response.awayTeamGoals,
      inProgress: response.inProgress,
    });
  }

  public static async updatePatch(req: Request, res: Response) {
    // const id = parseInt(req.params.id);
    const { id } = req.params;

    await matchService.patch(+id);

    return res.status(200).json({ message: 'Match finished' });
  }
}
export default MatchController;
