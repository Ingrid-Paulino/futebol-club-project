import { Op } from 'sequelize';
import MatchsModel from '../database/models/matchsModel';
import ClubsModel from '../database/models/clubsModel';
import ClubService from './clubService';
import { Club, TclubMock } from '../interfaces/IClub';
import { ICreateMatch, MatchData } from '../interfaces/IMatch';
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

  // public static retornoLeaderboard() {
  //   const arrayResult = this.leaderboardleaderboard();
  //   const decrecente = arrayResult.sort();
  //   return decrecente.reverse();
  // }

  public static async leaderboardleaderboard() {
    const clubs: TclubMock[] = await ClubService.getAll();
    const matchs: MatchsModel[] = await this.getAll();
    return clubs.map((club: TclubMock) => {
      const res = MatchService.RespostaFinalObj(club.clubName);
      matchs.forEach((match: MatchsModel) => {
        if (match.inProgress === 0) {
          if (match.homeTeam === club.id) {
            MatchService.funcoesHometeam(match.homeTeamGoals, match.awayTeamGoals, res);
          }

          if (match.awayTeam === club.id) {
            MatchService.funcoesAwayteam(match.homeTeamGoals, match.awayTeamGoals, res);
          }
        }
      });
      return res;
    });
  }

  public static async funcoesHometeam(
    homeTeamGoals: number,
    awayTeamGoals: number,
    res: MatchData,
  ) {
    MatchService.totalJogos(res);
    MatchService
      .checarResultadoHomeTeam(homeTeamGoals, awayTeamGoals, res);
    MatchService.aproveitamentoDoTime(res);
  }

  public static async funcoesAwayteam(
    homeTeamGoals: number,
    awayTeamGoals: number,
    res: MatchData,
  ) {
    MatchService.totalJogos(res);
    MatchService
      .checarResultadoAwayTeam(homeTeamGoals, awayTeamGoals, res);
    MatchService.aproveitamentoDoTime(res);
  }

  public static async totalJogos(res: MatchData) {
    res.totalGames += 1;
  }

  public static async checarResultadoHomeTeam(
    homeTeamGoals: number,
    awayTeamGoals: number,
    res: MatchData,
  ) {
    res.goalsFavor += homeTeamGoals;
    res.goalsOwn += awayTeamGoals;
    if (awayTeamGoals === homeTeamGoals) {
      res.totalPoints += 1;
      res.totalDraws += 1;
    }

    if (homeTeamGoals > awayTeamGoals) {
      res.totalPoints += 3;
      res.totalVictories += 1;
    } else { res.totalLosses += 1; }
  }

  public static async checarResultadoAwayTeam(
    homeTeamGoals: number,
    awayTeamGoals: number,
    res: MatchData,
  ) {
    res.goalsFavor += awayTeamGoals;
    res.goalsOwn += homeTeamGoals;
    res.goalsBalance = (res.goalsFavor - res.goalsOwn) * (-1);
    if (awayTeamGoals === homeTeamGoals) {
      res.totalPoints += 1;
      res.totalDraws += 1; // empates
    }

    if (awayTeamGoals > homeTeamGoals) {
      res.totalPoints += 3; // total pontos
      res.totalVictories += 1; // total vitorias
    } else { res.totalLosses += 1; } // derrotas
  }

  public static async aproveitamentoDoTime(res: MatchData) {
    const TP = res.totalPoints;
    const TJ = res.totalGames;
    // const count = ((TP / (TJ * 3)) * 100).toFixed(2);
    // (+count)
    res.efficiency += (+((TP / (TJ * 3)) * 100).toFixed(2));
  }

  public static async gols(
    homeTeamGoals: number,
    awayTeamGoals: number,
    res: MatchData,
  ) {
    if (homeTeamGoals > awayTeamGoals) {
      res.goalsFavor += homeTeamGoals;
    } else { res.totalLosses += 1; }
  }

  public static RespostaFinalObj(name: string) {
    return {
      name,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    };
  }
}

export default MatchService;
