import { Op } from 'sequelize';
import MatchsModel from '../database/models/matchsModel';
import ClubsModel from '../database/models/clubsModel';
import ClubService from './clubService';
import { Club } from '../interfaces/IClub';
import { ICreateMatch } from '../interfaces/IMatch';
import { IError } from '../interfaces/IError';
import ValidateError from '../utils';
import { TPartida } from '../types';

class MatchService {
  public static async getAll() {
    const filtered = await MatchsModel.findAll({
      include: [
        { model: ClubsModel, as: 'homeClub', attributes: ['clubName'] },
        { model: ClubsModel, as: 'awayClub', attributes: ['clubName'] },
      ],
    });
    return filtered;
  }

  // public static changeRes(param: Club[]) {
  //   const newArray = param.map((obj) => ({
  //     ...obj,
  //     inProgress: obj.inProgress === 1,
  //   }));
  //   return newArray;
  // }

  public static async getAllEndSearch(inProgress: string) {
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
      return filtered;
    }
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
    const matchUpdateReturn = await MatchsModel.update(
      { inProgress: 0 },
      { where: { id } },
    );
    return matchUpdateReturn;
  }

  public static async getById(partida: TPartida, id: number) {
    const { homeTeamGoals, awayTeamGoals } = partida;
    const updateReturn = await MatchsModel.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
    return updateReturn;
  }

  // public static timeVitorioso(matchs: Club[]) {
  //   const calculosMatchs = matchs.map((match: Club) => {
  //     let time1Gols = match.homeTeamGoals;
  //     let time2Gols = match.awayTeamGoals;
  //     if (time1Gols > time2Gols) {
  //       time1Gols += 3;
  //       let TotalJogos = match.homeTeam;
  //       return (time1Gols/(TotalJogos*3)*100).toFixed(2);
  //     } else { time2Gols = 0; }

  //     if (time1Gols < time2Gols) {
  //       time1Gols += 3;
  //       let TotalJogos = match.awayTeam;
  //       return (time2Gols/(TotalJogos*3)*100).toFixed(2);
  //     } else { time2Gols = 0; }

  //     if (time1Gols === time2Gols) {
  //       time1Gols += 1;
  //     } else { time2Gols += 1; }
  //   });

  //   return calculosMatchs;
  // }

  // public static AproveitamentoDoTime(matchs: Club[]) {
  //   const calculosMatchs = matchs.map((match: Club) => {
  //     let totalPontos = match.homeTeamGoals;
  //     let TotalJogos = match.homeTeam;
  //     const conta = (totalPontos/(TotalJogos*3)*100).toFixed(2);
  //     return conta;
  //   });

  //   return calculosMatchs;
  // }

  // public static leaderboardleaderboard() {
  //   const matchs = MatchService.getAll();
  //   MatchService.timeVitorioso(matchs),

  // }
}

export default MatchService;
