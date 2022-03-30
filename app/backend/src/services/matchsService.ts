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

  public static async leaderboardHomeTeam() {
    const clubs: TclubMock[] = await ClubService.getAll();
    const matchs: MatchsModel[] = await this.getAll();

    const desempenhoTimes = clubs.map((club: TclubMock) => {
      const res = MatchService.RespostaFinalObj(club.clubName);
      matchs.forEach((match: MatchsModel) => {
        if (match.inProgress === 0 && match.homeTeam === club.id) {
          MatchService.funcoesHometeam(match.homeTeamGoals, match.awayTeamGoals, res);
        }
      });
      res.goalsBalance += (res.goalsFavor - res.goalsOwn);
      res.efficiency = +(((res.totalPoints / (res.totalGames * 3)) * 100).toFixed(2));
      return res;
    });
    const response = this.retornoLeaderboard(desempenhoTimes);
    return response;
  }

  public static async leaderboardAwayTeam() {
    const clubs: TclubMock[] = await ClubService.getAll();
    const matchs: MatchsModel[] = await this.getAll();

    const desempenhoTimes = clubs.map((club: TclubMock) => {
      const res = MatchService.RespostaFinalObj(club.clubName);
      matchs.forEach((match: MatchsModel) => {
        if (match.inProgress === 0 && match.awayTeam === club.id) {
          MatchService.funcoesAwayteam(match.homeTeamGoals, match.awayTeamGoals, res);
        }
      });
      res.goalsBalance += (res.goalsFavor - res.goalsOwn);
      res.efficiency = +(((res.totalPoints / (res.totalGames * 3)) * 100).toFixed(2));
      return res;
    });
    const response = this.retornoLeaderboard(desempenhoTimes);
    return response;
  }

  public static async retornoLeaderboard(desempenhoTimes: MatchData[]) {
    const arrayResult: MatchData[] = desempenhoTimes;
    const decrescente = arrayResult.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
      if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;
      if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
      if (a.goalsFavor !== b.goalsFavor) return b.goalsFavor - a.goalsFavor;
      if (a.goalsOwn !== b.goalsOwn) return b.goalsOwn - a.goalsOwn;
      return 0;
    });
    return decrescente;
  }

  public static async leaderboardleaderboard() {
    const clubs: TclubMock[] = await ClubService.getAll();
    const matchs: MatchsModel[] = await this.getAll();
    const desempenhoTimes = clubs.map((club: TclubMock) => {
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
      res.goalsBalance += (res.goalsFavor - res.goalsOwn);
      res.efficiency = +(((res.totalPoints / (res.totalGames * 3)) * 100).toFixed(2));
      return res;
    });
    return this.retornoLeaderboard(desempenhoTimes);
  }

  public static async funcoesHometeam(
    homeTeamGoals: number,
    awayTeamGoals: number,
    res: MatchData,
  ) {
    MatchService.checarResultadoHomeTeam(homeTeamGoals, awayTeamGoals, res);
  }

  public static async funcoesAwayteam(
    homeTeamGoals: number,
    awayTeamGoals: number,
    res: MatchData,
  ) {
    MatchService.checarResultadoAwayTeam(homeTeamGoals, awayTeamGoals, res);
  }

  public static async checarResultadoHomeTeam(
    homeTeamGoals: number,
    awayTeamGoals: number,
    res: MatchData,
  ) {
    res.totalGames += 1;
    res.goalsFavor += homeTeamGoals;
    res.goalsOwn += awayTeamGoals;
    if (awayTeamGoals === homeTeamGoals) {
      res.totalPoints += 1;
      res.totalDraws += 1;
    } else if (homeTeamGoals > awayTeamGoals) {
      res.totalPoints += 3;
      res.totalVictories += 1;
    } else { res.totalLosses += 1; }
  }

  public static async checarResultadoAwayTeam(
    homeTeamGoals: number,
    awayTeamGoals: number,
    res: MatchData,
  ) {
    res.totalGames += 1;
    res.goalsFavor += awayTeamGoals;
    res.goalsOwn += homeTeamGoals;

    if (awayTeamGoals === homeTeamGoals) {
      res.totalPoints += 1;
      res.totalDraws += 1; // empates
    } else if (awayTeamGoals > homeTeamGoals) {
      res.totalPoints += 3; // total pontos
      res.totalVictories += 1; // total vitorias
    } else { res.totalLosses += 1; } // derrotas
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
