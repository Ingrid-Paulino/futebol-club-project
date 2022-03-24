import { Op } from 'sequelize';
import MatchsModel from '../database/models/matchsModel';
import ClubsModel from '../database/models/clubsModel';
import ClubService from './clubService';
import { Club } from '../interfaces/IClub';
import { ICreateMatch } from '../interfaces/IMatch';
import { IError } from '../interfaces/IError';
import ValidateError from '../utils';

class MatchService {
  public static async getAll() {
    try {
      const filtered = await MatchsModel.findAll({
        include: [
          { model: ClubsModel, as: 'homeClub', attributes: ['clubName'] },
          { model: ClubsModel, as: 'awayClub', attributes: ['clubName'] },
        ],
      });

      return filtered;
    } catch (error) { console.log(error); }
  }

  // public static changeRes(param: Club[]) {
  //   const newArray = param.map((obj) => ({
  //     ...obj,
  //     inProgress: obj.inProgress === 1,
  //   }));
  //   return newArray;
  // }

  public static async getAllEndSearch(inProgress: string) {
    try {
      if (inProgress === 'true') {
        const inProgressTrue = 1;
        const filtered = await MatchsModel.findAll({
          where: {
            [Op.or]: [{ inProgress: { [Op.like]: `%${inProgressTrue}%` } }],
          },
          include: [
            { model: ClubsModel, as: 'homeClub', attributes: ['clubName'] },
            { model: ClubsModel, as: 'awayClub', attributes: ['clubName'] },
          ],
        }) as unknown as Club[];

        // const response = MatchService.changeRes(filtered);
        // console.log({ response });
        return filtered;
      }
    } catch (error) { console.log(error); }
  }

  public static async createMatch(camposMatchs: ICreateMatch) {
    const {
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress,
    } = camposMatchs;

    const club1 = await ClubService.getById(homeTeam);
    const club2 = await ClubService.getById(awayTeam);

    if ((club1 as IError).status || (club2 as IError).status) {
      throw ValidateError(401, 'There is no team with such id!') as unknown as Error;
    }

    return MatchsModel.create({
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress,
    });
  }

  public static async patch(id: number) {
    await MatchsModel.update(
      { inProgress: 0 },
      { where: { id } },
    );
  }
}

export default MatchService;
